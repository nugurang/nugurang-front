import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button } from '@/components/Button';
import {
  Container,
  ContainerSection,
  ContainerSectionHeader,
  ContainerSubsection,
} from '@/components/Container';
import { Text } from '@/components/Text';
import { WithAuthServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuthLogin, login, logout } from '@/utilities/backend';

export const getServerSideProps = WithAuthServerSideProps();

function Home({ currentUser }) {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <Container>
      <ContainerSection>
        <ContainerSectionHeader title="홈" />
        <ContainerSubsection>
          <Text>{t('hello_world')}</Text>
          {currentUser && <div>{currentUser.name}</div>}
        </ContainerSubsection>
        <ContainerSubsection align="center">
          {!currentUser && (
            <Button label="로그인" onClick={() => oAuthLogin('github')} />
          )}
          {currentUser && (
            <>
              <Button label="로그아웃" onClick={() => logout()} />
              <Button
                label="샌드박스"
                onClick={() => router.push('/sandbox')}
              />
            </>
          )}
        </ContainerSubsection>
      </ContainerSection>
    </Container>
  );
}

export default Home;
