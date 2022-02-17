import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import SandboxIndexView from '@/src/components/templates/sandbox/index/IndexView';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

interface PageProps {
  currentOAuth2User: Object,
  callbackUrl: string;
  currentUser: any;
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
}

const SandboxIndex: NextPage<PageProps> = props => {
  return (
    <SandboxIndexView {...props} />
  );
}

export default WithCommonPreferences(SandboxIndex);
