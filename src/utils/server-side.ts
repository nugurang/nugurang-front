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

/*
export function withServerSideProps(serverSidePropsFunc?: Function) {
  return async (context: any) => {
    const commonServerSideProps = await getCommonServerSideProps(context);
    if (serverSidePropsFunc) {
      return {
        ...(await serverSidePropsFunc(context, commonServerSideProps)),
      };
    } else {
      return {
        props: {
          ...commonServerSideProps,
        }
      };
    }
  };
}
*/

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
      switch (networkErrorStatusCode) {
        case 401:
          if ((authType != 'all') && (authType != 'session')) {
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
          break;
        default:
          return {
            props: {
              ...commonServerSideProps,
              errorCode: networkErrorStatusCode,
            }
          }
      }
    }

    const currentUser = currentUserResponse.data ? currentUserResponse.data.currentUser : null;

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
