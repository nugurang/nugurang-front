import Container from '../components/Container';
import { GetServerSideProps } from 'next'
import Link from 'next/link';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { withServerSideProps } from '../utils/props';

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

export const getServerSideProps: GetServerSideProps = withServerSideProps();

interface Props {
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
}

const Home: NextPage<Props> = ({ isDark, setIsDark }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
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
  );
}

export default Home;
