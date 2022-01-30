import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

interface PageProps {
  currentUser: any,
  pathname: string,
}

const HomeIndex: NextPage<PageProps> = ({ currentUser, pathname }) => {
  const { t } = useTranslation('common');
  return (
    <Container
      currentUser={currentUser}
      header
      footer
      navigationBar
      pathname={pathname}
    >
      <Card>
        {t('_helloWorld')}
      </Card>
    </Container>
  );
}

export default HomeIndex;
