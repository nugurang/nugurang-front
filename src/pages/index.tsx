import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const DivStyle = styled.div`
  ${(props: any) => `
    background-color: ${props.theme.color.primary.main};
    color: white;
    font-size: 24px;
    border-radius: 4px;
    padding: 32px;
    text-align: center;
    ${props.theme.mediaQuery.isMobile} {
      background-color: ${props.theme.color.primary.dark};
    }
  `}
`;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const Home: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <div>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <DivStyle>
          <h3>{t('helloWorld')}</h3>
        </DivStyle>
        <Link
          href='/'
          locale={router.locale === 'en' ? 'ko' : 'en'}
        >
          <button>
            {t('change-locale')}
          </button>
        </Link>
      </main>
    </div>
  );
}

export default Home;
