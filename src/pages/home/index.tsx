import { useTranslation } from 'next-i18next';
import { Button } from '@/components/Button';
import {
  Container,
  ContainerSection,
  ContainerSectionHeader,
  ContainerSubsection,
} from '@/components/Container';
import { WithAuthServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuthLogin, login, logout } from '@/utilities/backend';

export const getServerSideProps = WithAuthServerSideProps();

const Home = ({ currentUser }) => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <ContainerSection>
        <ContainerSectionHeader title="홈" />
        <ContainerSubsection>
          <div>{t('hello_world')}</div>
          {currentUser && <div>{currentUser.name}</div>}
        </ContainerSubsection>
        <ContainerSubsection align="center">
          {!currentUser && (
            <Button label="로그인" onClick={() => oAuthLogin('github')} />
          )}
          {currentUser && <Button label="로그아웃" onClick={() => logout()} />}
        </ContainerSubsection>
      </ContainerSection>
    </Container>
  );
};

export default Home;
