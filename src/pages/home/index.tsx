import { WindowSizeContext } from '@/contexts/WindowSizeContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'grommet';
import { WithAuthServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuthLogin, login, logout } from '@/utilities/backend';

export const getServerSideProps = WithAuthServerSideProps();

const Home = ({ currentUser }) => {
  const router = useRouter();
  const windowSize = useContext(WindowSizeContext);

  return (
    <>
      {currentUser && <div>{currentUser.name}</div>}
      <>
        <Button label="로그인" onClick={() => oAuthLogin('github')} />
      </>
      <>
        <Button label="로그아웃" onClick={() => logout()} />
      </>
    </>
  );
};

export default Home;
