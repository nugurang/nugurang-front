import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Container from '@/components/container/Container';
import Page from '@/components/page/Page';
import Text from '@/components/text/Text';
import { wallpaperSourceUrl } from '@/constants/common';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { oAuth2Login, logout } from '@/services/oAuth2/index';

export const getServerSideProps = WithCheckUserServerSideProps();

interface PageProps extends WithCheckUserServerSidePropsResponse {}
export default ({ currentUser }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  return (
    <Container
      wallpaperUrl={wallpaperSourceUrl}
    >
      <Page setPadding>
        <Text variant='h2' align='center'>
          {commonTranslation('sentences.hello_world')}
        </Text>
        {!currentUser && (
          <ButtonGroup>
            <Button onClick={() => oAuth2Login('github')}>로그인</Button>
          </ButtonGroup>
        )}
        {currentUser && (
          <>
            <Text variant='p' align='center'>
              {currentUser.name}
            </Text>
            <ButtonGroup direction='horizontal'>
              <Button onClick={() => logout()}>로그아웃</Button>
              <Button onClick={() => router.push('/dev/ping')}>Ping</Button>
            </ButtonGroup>
          </>
        )}
      </Page>
      <Page setPadding>
        <Text variant='h2' align='center'>
          {commonTranslation('sentences.hello_world')}
        </Text>
        {!currentUser && (
          <ButtonGroup>
            <Button onClick={() => oAuth2Login('github')}>로그인</Button>
          </ButtonGroup>
        )}
        {currentUser && (
          <>
            <Text variant='p' align='center'>
              {currentUser.name}
            </Text>
            <ButtonGroup direction='horizontal'>
              <Button onClick={() => logout()}>로그아웃</Button>
              <Button onClick={() => router.push('/dev/ping')}>Ping</Button>
            </ButtonGroup>
          </>
        )}
      </Page>
    </Container>
  );
};
