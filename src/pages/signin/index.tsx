import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/button/Button';
import Centerizer from '@/components/layout/Centerizer';
import Container from '@/components/layout/Container';
import SizeFixer from '@/components/layout/SizeFixer';
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
      wallpaperUrl={wallpaperSourceUrl}
    >
      <SizeFixer height='400px' width='400px'>
        <Centerizer horizontally vertically>
          <Text variant='h2' align='center'>
            {commonTranslation('sentences.please_sign_in')}
          </Text>
          {currentUser && <span>{currentUser.name}</span>}
          <Button fullWidth onClick={() => oAuth2Login('github')}>
            GitHub 로그인
          </Button>
          <Button fullWidth onClick={() => handleClickBackButton()}>
            뒤로가기
          </Button>
        </Centerizer>
      </SizeFixer>
    </Container>
  );
};
