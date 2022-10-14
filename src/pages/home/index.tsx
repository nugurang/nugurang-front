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

const Home = ({ currentUser }) => {
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
          {currentUser && <Button label="로그아웃" onClick={() => logout()} />}
        </ContainerSubsection>
      </ContainerSection>
    </Container>
  );
};

export default Home;
