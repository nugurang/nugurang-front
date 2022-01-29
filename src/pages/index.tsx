import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next'
import Link from '@/src/components/Link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { withServerSideProps } from '@/src/utils/props';

export const getServerSideProps: GetServerSideProps = withServerSideProps();

interface Props {
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
}

const Home: NextPage<Props> = ({ isDark, setIsDark }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <Container
      header
      footer
      navigationBar
      navigationBarItems={[
        {
          href: '/',
          icon: ['fas', 'coffee'],
          label: 'index',
          active: true
        },
        {
          href: '/a',
          icon: ['fas', 'coffee'],
          label: 'index',
        },
      ]}
    >
      <Card>
        {t('_helloWorld')}
        <Link
          href='/'
          locale={router.locale === 'en' ? 'ko' : 'en'}
          button={true}
        >
          {`change-locale`}
        </Link>
        <Button
          onClick={() => {setIsDark(!isDark)}}
        >
          {isDark ? 'Dark' : 'Light'}
        </Button>
      </Card>
    </Container>
  );
}

export default Home;
