import Button from '@/src/components/Button';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { getWindowLocation } from '@/src/utils/url';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

const Login: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  return (
    <Container>
      {session && session.user ? (
        <>
          Hello, {session.user.name}!
          <Button
            onClick={() => router.push({
              pathname: '/session/logout',
              query: {
                callbackUrl: getWindowLocation()
              },
            })}
          >
            {t('logout')}
          </Button>
        </>
      ) : (
        <Button
          onClick={() => router.push({
            pathname: '/session/login',
            query: {
              callbackUrl: getWindowLocation(),
              providerName: 'github'
            },
          })}
        >
          {t('login')}
        </Button>
      )}
    </Container>
  );
}

export default Login;
