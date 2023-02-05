import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CenterizedPage from '@/components/page/CenterizedPage';
import Container from '@/components/container/Container';
import Text from '@/components/text/Text';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuth2Login } from '@/services/oAuth2/index';
import { wallpaperSourceUrl } from '@/constants/common';

export const getServerSideProps = WithDefaultServerSideProps();

export default ({ currentUser }) => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <Container
      centerizeVertically
      showNavigationBar={false}
      showStatusBar={false}
      wallpaperUrl={wallpaperSourceUrl}
    >
      <CenterizedPage setPadding>
        <Text variant='h2' align='center'>
          {commonTranslation('sentences.please_sign_in')}
        </Text>
        {currentUser && <span>{currentUser.name}</span>}
        <ButtonGroup>
          <Button fullWidth onClick={() => oAuth2Login('github')}>
            GitHub 로그인
          </Button>
          <Button fullWidth onClick={() => handleClickBackButton()}>
            뒤로가기
          </Button>
        </ButtonGroup>
      </CenterizedPage>
    </Container>
  );
};
