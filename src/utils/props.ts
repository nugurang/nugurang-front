import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export function withServerSideProps(serverSidePropsFunc?: Function) {
  return async (context: any) => {
    const [session, translation] = await Promise.all([
      getSession(context),
      serverSideTranslations(context.locale, ['common'])
    ]);

    if(serverSidePropsFunc) {
      return {
        props: {
          ...translation,
          ...(await serverSidePropsFunc(context, session)),
        }
      };
    } else {
      return {
        props: {
          ...translation,
        }
      };
    }
  };
}
