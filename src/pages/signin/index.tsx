import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CenterizedContainer from '@/compositions/container/CenterizedContainer';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuth2Login } from '@/services/oAuth2/index';
import { getImageUrl } from '@/constants/common';
import { useState } from 'react';
import { OAuth2Provider } from '@/constants/oAuth2';
import Header1 from '@/components/text/Header1';
import Paragraph from '@/components/text/Paragraph';

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
      wallpaperUrl={getImageUrl({ keyword: 'crowd' })}
    >
      <Box
        width='400px'
        maxWidth='100vw'
        horizontalPaddingLevel={2}
        verticalPaddingLevel={2}
      >
        <Header1 align='center'>
          nugurang
        </Header1>
        <Paragraph align='center'>
          {commonTranslation('sentences.please_sign_in')}
        </Paragraph>
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
      </Box>
    </CenterizedContainer>
  );
};
