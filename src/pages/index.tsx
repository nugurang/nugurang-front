import Container from '../components/Container';
import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const DivBanner = styled.div`
  ${(props: any) => `
    background-color: ${props.theme.palette.primary.main};
    font-size: 24px;
    border-radius: 4px;
    padding: 32px;
    text-align: center;
    ${props.theme.mediaQuery.isMobile} {
      background-color: ${props.theme.palette.primary.dark};
    }
  `}
`;

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

interface Props {
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
}

const Home: NextPage<Props> = ({ isDark, setIsDark }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <DivBanner>
          <h3>{t('helloWorld')}</h3>
        </DivBanner>
        <Link
          href='/' passHref
          locale={router.locale === 'en' ? 'ko' : 'en'}
        >
          <button>
            {t('change-locale')}
          </button>
        </Link>
        <button onClick={() => {setIsDark(!isDark)}}>
          {isDark ? 'Dark' : 'Light'}
        </button>
      </Container>
    </>
  );
}

export default Home;
