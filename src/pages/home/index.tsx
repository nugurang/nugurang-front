import { useRouter } from 'next/router';
import { WithAuthServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuth2Login, logout } from '@/services/oAuth2/index';

export const getServerSideProps = WithAuthServerSideProps();

function Home({ currentUser }) {
  const router = useRouter();

  return (
    <>
      <p>{'hello_world'}</p>
      {!currentUser && (
        <>
          <button onClick={() => oAuth2Login('github')} >로그인</button>
        </>
      )}
      {currentUser && (
        <>
          <p>{currentUser.name}</p>
          <button onClick={() => logout()} >로그아웃</button>
          <button onClick={() => router.push('/sandbox')} >샌드박스</button>
        </>
      )}
    </>
  );
}

export default Home;
