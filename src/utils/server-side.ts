import { getSession } from 'next-auth/react';
import { queryToBackend } from '@/src/utils/backend';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

async function getCommonServerSideProps(context: any) {
  const callbackUrl = context.query.callbackUrl ?? context.resolvedUrl;
  const [translation] = await Promise.all([
    serverSideTranslations(context.locale, ['common'])
  ]);
  return {
    pathname: context.resolvedUrl,
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
    ) {
      const networkErrorStatusCode = currentUserResponse.error.networkError.statusCode;
      return {
        props: {
          ...commonServerSideProps,
          errorCode: networkErrorStatusCode,
        }
      }
    }
    
    const currentUser = currentUserResponse.data ? currentUserResponse.data.currentUser : null;
    if (!currentUser) {
      return {
        redirect: {
          permanent: false,
          destination: `/myaccount/register?callbackUrl=${commonServerSideProps.callbackUrl}`,
        },
        props: {
          ...commonServerSideProps,
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
