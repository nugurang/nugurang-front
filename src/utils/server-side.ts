import { queryToBackend } from '@/src/utils/backend';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

async function getCommonServerSideProps(context: any) {
  const [translation] = await Promise.all([
    serverSideTranslations(context.locale, ['common'])
  ]);
  return {
    ...translation,
  };
}

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

export function withAuthServerSideProps(serverSidePropsFunc?: Function) {
  return async (context: any) => {
    const commonServerSideProps = await getCommonServerSideProps(context);
    const { data: currentOAuth2User, error } = await queryToBackend(context, `
      query CurrentOAuth2User {
        currentOAuth2User {
          id
          name
          email
        }
      }
    `);

    if (error
      && (error.hasOwnProperty('networkError'))
      && (error.networkError.hasOwnProperty('statusCode'))
    ) {
      const networkErrorStatusCode = error.networkError.statusCode;
      switch (networkErrorStatusCode) {
        case 401:
          /*
          const callbackUrl = context.resolvedUrl;
          return {
            redirect: {
              permanent: false,
              destination: `/session/logout?callbackUrl=${callbackUrl}`,
            },
            props: {
              callbackUrl
            }
          }
          */
          return {
            props: {
              ...commonServerSideProps,
              errorCode: networkErrorStatusCode,
            }
          }
        default:
          return {
            props: {
              ...commonServerSideProps,
              errorCode: networkErrorStatusCode,
            }
          }
      }
    }

    if (serverSidePropsFunc) {
      return {
        ...(await serverSidePropsFunc(context, {
          ...commonServerSideProps,
          currentOAuth2User
        })),
      };
    } else {
      return {
        props: {
          ...commonServerSideProps,
          currentOAuth2User,
        }
      };
    }
  };
}
