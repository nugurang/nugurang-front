import {
  AccessDeniedError,
  LoginRequiredError
} from '@/src/errors/Errors';
import {
  getCurrentUserFromBackend,
  mutateToBackend
} from '@/src/utils/backend';

import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

async function getCommonServerSideProps(context: any) {
  const callbackUrl = context.query.callbackUrl ?? `${process.env.NEXT_PUBLIC_FRONTEND_URL}${context.resolvedUrl}`;
  const [translation] = await Promise.all([
    serverSideTranslations(context.locale, ['common'])
  ]);
  return {
    callbackUrl,
    ...translation,
  };
}

const registerUser = async (context: any, session: any) => {

  try {
    let imageId;
    if (session.user!.image) {
      const createImageResponse = await mutateToBackend(context, `
        mutation CreateImage($address: String!) {
          createImage (address: $address) {
            id
            address
          }
        }
      `, {
        address: session.user!.image
      });
      if (createImageResponse.hasOwnProperty('error')) throw new Error('Unknown Error');
      imageId = createImageResponse.data.createImage.id;
    }
    const createCurrentUserResponse = await mutateToBackend(context, `
      mutation CreateCurrentUser($user: UserInput!) {
        createCurrentUser (user: $user) {
          id
        }
      }
    `, {
      user: {
        name: session.user!.name,
        email: session.user!.email,
        biography: '',
        image: imageId,
      }
    }) as any;
    if (createCurrentUserResponse.hasOwnProperty('error')) throw new Error('Unknown Error');
    return createCurrentUserResponse.data.createCurrentUser;
  } catch {
    return false;
  }
};

type AuthType = 'all'
              | 'session'
              | 'user'
              | 'administrator';

export function withAuthServerSideProps(authType: AuthType, serverSidePropsFunc?: Function) {
  return async (context: any) => {

    const commonServerSideProps = await getCommonServerSideProps(context);
    let currentUser = await getCurrentUserFromBackend(context);
    const session = await getSession(context);

    if (session && !currentUser) {
      await registerUser(context, session);
      currentUser = await getCurrentUserFromBackend(context);
    }

    try {

      if ((['all'].find(e => e == authType) === undefined) && !session) {
        throw new LoginRequiredError();
      }
      if ((['all', 'session'].find(e => e == authType) === undefined) && !currentUser) {
        throw new AccessDeniedError();
      }
  
      return serverSidePropsFunc ? {
        ...(await serverSidePropsFunc(context, {
          ...commonServerSideProps,
          currentUser
        })),
      } : {
        props: {
          ...commonServerSideProps,
          currentUser
        }
      };

    } catch (error) {
      if (error instanceof LoginRequiredError) {
        return {
          redirect: {
            permanent: false,
            destination: `/login?callbackUrl=${commonServerSideProps.callbackUrl}`,
          },
          props: {
            ...commonServerSideProps,
          }
        }
      } else if (error instanceof AccessDeniedError) {
        console.error(error);
        return {
          props: {
            ...commonServerSideProps,
            errorCode: 401
          }
        }
      } else {
        console.error(error);
        return {
          props: {
            ...commonServerSideProps,
            errorCode: 500
          }
        }
      }
    }

  };
}
