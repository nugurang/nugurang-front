import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import Section from '@/src/components/Section';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

interface PageProps {
  currentUser: any,
  callbackUrl: string,
}

const HomeIndex: NextPage<PageProps> = ({ currentUser, callbackUrl }) => {
  const { t } = useTranslation('common');
  return (
    <Container
      callbackUrl={callbackUrl}
      currentUser={currentUser}
    >
      <Section>
        {t('_helloWorld')}
      </Section>
    </Container>
  );
}

export default HomeIndex;
