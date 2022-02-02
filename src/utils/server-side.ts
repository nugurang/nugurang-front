import { getSession } from 'next-auth/react';
import { mutateToBackend } from '@/src/utils/backend';
import { queryToBackend } from '@/src/utils/backend';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const registerUser = async (context: any, session: any) => {

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
  if (createCurrentUserResponse.hasOwnProperty('error')) {
    return false;
  }
  return true;
};

async function getCommonServerSideProps(context: any) {
  const callbackUrl = context.query.callbackUrl ?? `${process.env.NEXT_PUBLIC_FRONTEND_URI}${context.resolvedUrl}`;
  const [translation] = await Promise.all([
    serverSideTranslations(context.locale, ['common'])
  ]);
  return {
    callbackUrl,
    ...translation,
  };
}

type AuthType = 'all'
              | 'session'
              | 'user';

export function withAuthServerSideProps(authType: AuthType, serverSidePropsFunc?: Function) {
  return async (context: any) => {
    const commonServerSideProps = await getCommonServerSideProps(context);
    const session = await getSession(context);

    if (!session && (authType != 'all')) {
      return {
        redirect: {
          permanent: false,
          destination: `/login?callbackUrl=${commonServerSideProps.callbackUrl}`,
        },
        props: {
          ...commonServerSideProps,
        }
      }
    }

    const currentUserResponse = await queryToBackend(context, `
      query CurrentUser {
        currentUser {
          id
          oauth2Provider
          oauth2Id
          name
          email
          image {
            id
            address
          }
          biography
        }
      }
    `);


    if (currentUserResponse.error
      && (currentUserResponse.error.hasOwnProperty('networkError'))
      && (currentUserResponse.error.networkError.hasOwnProperty('statusCode'))
      && (authType != 'all')
    ) {
      return {
        redirect: {
          permanent: false,
          destination: `/`,
        },
        props: {}
      }
    }
    
    const currentUser = currentUserResponse.data ? currentUserResponse.data.currentUser : null;
    if (!currentUser && (authType != 'all')) {
      const registerUserResult = await registerUser(context, session);
      if (!registerUserResult) {
        return {
          redirect: {
            permanent: false,
            destination: `/`,
          },
          props: {}
        }
      }
    }

    if (serverSidePropsFunc) {
      return {
        ...(await serverSidePropsFunc(context, {
          ...commonServerSideProps,
          currentUser
        })),
      };
    } else {
      return {
        props: {
          ...commonServerSideProps,
          currentUser
        }
      };
    }
  };
}
