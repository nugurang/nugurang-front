import { GetServerSideProps } from 'next';
import HomeIndexView from '@/src/components/templates/home/index/IndexView';
import type { NextPage } from 'next';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

interface PageProps {
  currentUser: any,
  callbackUrl: string,
}

const HomeIndex: NextPage<PageProps> = props => {
  return (
    <HomeIndexView {...props} />
  );
}

export default WithCommonPreferences(HomeIndex);
