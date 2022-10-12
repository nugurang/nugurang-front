import { useRouter } from 'next/router';
import { Button } from 'grommet';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuthLogin } from '@/utilities/backend';
import { useTranslation } from 'next-i18next';

export const getServerSideProps = WithDefaultServerSideProps();

const Signin = ({ currentUser }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <>
      <div>{t('hello_world')}</div>
      {currentUser && <div>{currentUser.name}</div>}
      <>
        <Button label="뒤로가기" onClick={() => handleClickBackButton()} />
        <Button label="GitHub 로그인" onClick={() => oAuthLogin('github')} />
      </>
    </>
  );
};

export default Signin;
