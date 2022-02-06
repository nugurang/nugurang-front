import { GetServerSideProps, NextPage } from 'next';
import { getCurrentUserFromBackend, loginToBackend, registerToBackend } from '@/src/utils/backend';

import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const callbackUrl = context.query.callbackUrl;
  const session = await getSession(context);

  await loginToBackend(context, session);
  const currentUserResponse = await getCurrentUserFromBackend(context);
  if (!currentUserResponse) {
    // 백엔드 서버에 사용자 등록
    await registerToBackend(context, session);
    await loginToBackend(context, session);
  }

  return {
    redirect: {
      permanent: false,
      destination: callbackUrl,
    },
    props: {},
  };

}

const Callback: NextPage = () => {
  return <></>;
};

export default Callback;
