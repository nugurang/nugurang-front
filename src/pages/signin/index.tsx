import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CenterizedContainer from '@/compositions/container/CenterizedContainer';
import Text from '@/components/text/Text';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuth2Login } from '@/services/oAuth2/index';
import { wallpaperSourceUrl } from '@/constants/common';
import { useState } from 'react';
import { OAuth2Provider } from '@/constants/oAuth2';

export const getServerSideProps = WithDefaultServerSideProps();

export default () => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const setSelectedProviderAndLogin = (provider: OAuth2Provider) => {
    setSelectedProvider(provider)
    oAuth2Login(provider);
  };

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <CenterizedContainer
      wallpaperUrl={wallpaperSourceUrl}
    >
      <Box
        width='400px'
        maxWidth='100vw'
        horizontalPaddingLevel={2}
        verticalPaddingLevel={2}
      >
        <Text variant='h1' align='center'>
          nugurang
        </Text>
        <Text variant='p' align='center'>
          {commonTranslation('sentences.please_sign_in')}
        </Text>
        <ButtonGroup direction='vertical'>
          <Button
            fullWidth
            fillVariant='filled'
            isLoading={selectedProvider === 'github'}
            palette='default'
            onClick={() => setSelectedProviderAndLogin('github')}
          >
            GitHub 계정으로 로그인
          </Button>
          <Button
            fullWidth
            fillVariant='filled'
            palette='default'
          >
            준비중입니다.
          </Button>
          <Button
            fullWidth
            fillVariant='filled'
            palette='default'
          >
            준비중입니다.
          </Button>
        </ButtonGroup>
        <ButtonGroup direction='vertical'>
          <Button
            fullWidth
            fillVariant='filled'
            palette='error'
            onClick={() => handleClickBackButton()}
          >
            뒤로가기
          </Button>
        </ButtonGroup>
      </Box>
    </CenterizedContainer>
  );
};
