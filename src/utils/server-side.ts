import {
  AccessDeniedError,
  LoginRequiredError
} from '@/src/errors/Errors';
import {
  getCurrentUserFromBackend,
  registerToBackend
} from '@/src/utils/backend';

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

type AuthType = 'all'
              | 'session'
              | 'user'
              | 'administrator';

export function withAuthServerSideProps(authType: AuthType, serverSidePropsFunc?: Function) {
  return async (context: any) => {

    const commonServerSideProps = await getCommonServerSideProps(context);
    let currentUser = await getCurrentUserFromBackend(context);

    try {

      if ((['all'].find(e => e == authType) === undefined) && !currentUser) {
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
            destination: `/session/login?callbackUrl=${commonServerSideProps.callbackUrl}`,
          },
          props: {
            ...commonServerSideProps
          }
        }
      } else if (error instanceof AccessDeniedError) {
        console.error(error);
        return {
          props: {
            ...commonServerSideProps,
            errorCode: 403
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
