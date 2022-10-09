import { useRouter } from 'next/router';
import { Button } from 'grommet';
import { oAuthLogin } from '@/utilities/backend';

const Signin = ({ currentUser }) => {
  const router = useRouter();

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <>
      {currentUser && <div>{currentUser.name}</div>}
      <>
        <Button label="뒤로가기" onClick={() => handleClickBackButton()} />
        <Button label="GitHub 로그인" onClick={() => oAuthLogin('github')} />
      </>
    </>
  );
};

export default Signin;
