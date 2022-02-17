import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import TabNameView from '@/src/components/templates/settings/tabName/TabNameView';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { useRouter } from 'next/router';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('user');

interface PageProps {
  currentUser: any
}

const TabName: NextPage<PageProps> = ({ currentUser }) => {
  const router = useRouter();
  const { tabName: selectedTabName } = router.query;

  return (
    <TabNameView
      currentUser={currentUser}
      selectedTabName={selectedTabName as string}
    />
  );
}

export default WithCommonPreferences(TabName);
