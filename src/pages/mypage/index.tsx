import { GetServerSideProps } from 'next';
import MyPageIndexView from '@/src/components/templates/mypage/index/IndexView';
import type { NextPage } from 'next';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { useState } from 'react';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('user');

interface PageProps {
  currentUser: any
}

const MyPageIndex: NextPage<PageProps> = props => {
  const [logoutState, setLogoutState] = useState({
    isDialogOpen: false,
    isPending: false
  });
  const updateLogoutState = (value: any) => setLogoutState((state: any) => ({
    ...state,
    ...value
  }));
  return (
    <MyPageIndexView
      {...props}
      logoutState={logoutState}
      updateLogoutState={updateLogoutState}
    />
  );
}

export default WithCommonPreferences(MyPageIndex);
