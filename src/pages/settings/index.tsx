import ForwardedPage from './[tabName]';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('user');

const SettingsIndex: NextPage = (props: any) => {
  return <><ForwardedPage {...props}/></>;
}

export default SettingsIndex;
