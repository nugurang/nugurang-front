import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { WithAuthServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuthLogin, login, logout } from '@/services/oAuth2/index';

export const getServerSideProps = WithAuthServerSideProps();

function Home({ currentUser }) {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <p>{t('hello_world')}</p>
      {!currentUser && (
        <button onClick={() => oAuthLogin('github')} >로그인</button>
      )}
      {currentUser && (
        <>
          <button onClick={() => logout()} >로그아웃</button>
          <button onClick={() => router.push('/sandbox')} >샌드박스</button>
        </>
      )}
    </>
  );
}

export default Home;
