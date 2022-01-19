import { signIn, signOut } from "next-auth/react"

import Button from '../components/Button';
import Container from '../components/Container';
import { GetServerSideProps } from 'next'
import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { useSession } from "next-auth/react"
import { useTranslation } from 'next-i18next';
import { withServerSideProps } from '../utils/props';

export const getServerSideProps: GetServerSideProps = withServerSideProps();

interface Props {
  session: Session;
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
}

const Login: NextPage<Props> = () => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  return (
    <Container>
      {session && session.user ? (
        <>
          Hello, {session.user.name}!
          <Button label={t('logout')} onClick={() => signOut()} />
        </>
      ) : (
        <Button label={t('login')} onClick={() => signIn('github')} />
      )}
    </Container>
  );
}

export default Login;
