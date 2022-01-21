import Button from '../components/Button';
import Container from '../components/Container';
import { GetServerSideProps } from 'next'
import Link from 'next/link';
import { NextPage } from 'next';
import { getWindowLocation } from '../utils/url';
import { useSession } from "next-auth/react"
import { useTranslation } from 'next-i18next';
import { withServerSideProps } from '../utils/props';

export const getServerSideProps: GetServerSideProps = withServerSideProps();

const Login: NextPage = () => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  return (
    <Container>
      {session && session.user ? (
        <>
          Hello, {session.user.name}!
          <Link href={{ pathname: '/session/logout', query: {
            callbackUrl: getWindowLocation()
          }}}>
            <Button label={t('logout')} />
          </Link>
        </>
      ) : (
        <Link href={{ pathname: '/session/login', query: {
          callbackUrl: getWindowLocation(),
          providerName: 'github'
        }}}>
          <Button label={t('login')} />
        </Link>
      )}
    </Container>
  );
}

export default Login;
