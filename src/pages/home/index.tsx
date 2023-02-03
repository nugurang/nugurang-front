import { useRouter } from 'next/router';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { oAuth2Login, logout } from '@/services/oAuth2/index';

export const getServerSideProps = WithCheckUserServerSideProps();

interface PageProps extends WithCheckUserServerSidePropsResponse {}
export default ({ currentUser }: PageProps) => {
  const router = useRouter();

  return (
    <>
      <p>{'hello_world'}</p>
      {!currentUser && (
        <>
          <button onClick={() => oAuth2Login('github')}>로그인</button>
        </>
      )}
      {currentUser && (
        <>
          <p>{currentUser.name}</p>
          <button onClick={() => logout()}>로그아웃</button>
          <button onClick={() => router.push('/dev/ping')}>Ping</button>
        </>
      )}
    </>
  );
};
