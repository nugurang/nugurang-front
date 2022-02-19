import {
  AccessDeniedError,
  LoginRequiredError
} from '@/errors/Errors';

import { getCurrentUser } from '@/backend/dao/user';
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
              | 'user'
              | 'administrator';

export function withAuthServerSideProps(authType: AuthType, serverSidePropsFunc?: Function) {
  return async (context: any) => {
  
    const commonServerSideProps = await getCommonServerSideProps(context);
    
    try {

      const currentUserResponse = await getCurrentUser(context);
      let currentUser = currentUserResponse.data;

      if ((['all'].find(e => e == authType) === undefined) && !currentUser) {
        throw new LoginRequiredError();
      }
      if ((['all', 'user'].find(e => e == authType) === undefined) && !currentUser) {
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
            errorCode: 401
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
