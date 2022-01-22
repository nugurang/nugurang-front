import Button from '@/src/components/Button';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next'
import { NextPage } from 'next';
import { getWindowLocation } from '@/src/utils/url';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"
import { useTranslation } from 'next-i18next';
import { withServerSideProps } from '@/src/utils/props';

export const getServerSideProps: GetServerSideProps = withServerSideProps();

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
            label={t('logout')}
            onClick={() => router.push({
              pathname: '/session/logout',
              query: {
                callbackUrl: getWindowLocation()
              },
            })}
          />
        </>
      ) : (
        <Button
          label={t('login')}
          onClick={() => router.push({
            pathname: '/session/login',
            query: {
              callbackUrl: getWindowLocation(),
              providerName: 'github'
            },
          })}
        />
      )}
    </Container>
  );
}

export default Login;
