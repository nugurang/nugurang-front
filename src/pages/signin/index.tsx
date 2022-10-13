import { useRouter } from 'next/router';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuthLogin } from '@/utilities/backend';
import { useTranslation } from 'next-i18next';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import {
  Container,
  ContainerSection,
  ContainerSectionHeader,
  ContainerSubsection,
} from '@/components/Container';

export const getServerSideProps = WithDefaultServerSideProps();

const Signin = ({ currentUser }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <Container>
      <ContainerSection>
        <ContainerSectionHeader
          title="로그인"
          subtitle="로그인해주세요."
          actions={
            <Box>
              <Button
                label="뒤로가기"
                onClick={() => handleClickBackButton()}
              />
            </Box>
          }
        />
        <ContainerSubsection>
          <div>{t('hello_world')}</div>
          {currentUser && <div>{currentUser.name}</div>}
        </ContainerSubsection>
        <ContainerSubsection align="center">
          <Button
            label="GitHub 로그인"
            onClick={() => oAuthLogin('github')}
            primary
          />
        </ContainerSubsection>
      </ContainerSection>
    </Container>
  );
};

export default Signin;
