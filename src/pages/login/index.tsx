import { GetServerSideProps } from 'next';
import LoginIndexView from '@/components/templates/login/index/IndexView';
import type { NextPage } from 'next';
import WithCommonPreferences from '@/components/WithCommonPreferences';
import { useState } from 'react';
import { withAuthServerSideProps } from '@/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all', (context: any, props: any) => {
  const callbackUrl = context.query.callbackUrl;
  return {
    props: {
      ...props,
      callbackUrl
    }
  }
});

interface PageProps {
  currentUser: any,
  callbackUrl: string,
}

const LoginIndex: NextPage<PageProps> = props => {
  const [loginState, setLoginState] = useState({
    isDialogOpen: false
  });
  const updateLoginState = (value: any) => setLoginState((state: any) => ({
    ...state,
    ...value
  }));
  return (
    <LoginIndexView
      {...props}
      loginState={loginState}
      updateLoginState={updateLoginState}
    />
  );
}

export default WithCommonPreferences(LoginIndex);
