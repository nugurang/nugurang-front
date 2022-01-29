import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next';
import Link from '@/src/components/Link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();

interface PageProps {
  currentOAuth2User: Object,
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
}

const Sandbox: NextPage<PageProps> = ({ currentOAuth2User, isDark, setIsDark }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  console.log(currentOAuth2User);
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
          href: '/',
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

export default Sandbox;
