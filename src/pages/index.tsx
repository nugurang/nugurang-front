import Container from '@/src/components/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps } from 'next'
import Link from 'next/link';
import type { NextPage } from 'next';
import Text from '@/src/components/Text';
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
    <Container header footer navigationBar>
      <Text>{t('_helloWorld')}</Text>
      <Link
        href='/' passHref
        locale={router.locale === 'en' ? 'ko' : 'en'}
      >
        <button>
          change-locale
        </button>
      </Link>
      <button onClick={() => {setIsDark(!isDark)}}>
        {isDark ? 'Dark' : 'Light'}
      </button>
      <FontAwesomeIcon icon={['fas', 'coffee']} />
    </Container>
  );
}

export default Home;
