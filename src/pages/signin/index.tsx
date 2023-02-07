import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CenterizedPage from '@/components/page/CenterizedPage';
import Container from '@/compositions/container/Container';
import Text from '@/components/text/Text';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuth2Login } from '@/services/oAuth2/index';
import { wallpaperSourceUrl } from '@/constants/common';

export const getServerSideProps = WithDefaultServerSideProps();

export default () => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <Container
      centerizeVertically
      showHeader={false}
      wallpaperUrl={wallpaperSourceUrl}
    >
      <CenterizedPage>
        <Box
          width='400px'
          maxWidth='100vw'
          horizontalPaddingLevel={2}
          verticalPaddingLevel={2}
        >
          <Text variant='h2' align='center'>
            {commonTranslation('sentences.please_sign_in')}
          </Text>
          <ButtonGroup>
            <Button fullWidth onClick={() => oAuth2Login('github')}>
              GitHub 로그인
            </Button>
            <Button fullWidth onClick={() => handleClickBackButton()}>
              뒤로가기
            </Button>
          </ButtonGroup>
        </Box>
      </CenterizedPage>
    </Container>
  );
};
