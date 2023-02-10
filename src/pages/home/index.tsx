import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Container from '@/compositions/container/Container';
import Page from '@/compositions/page/Page';
import Text from '@/components/text/Text';
import { wallpaperSourceUrl } from '@/constants/common';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';

export const getServerSideProps = WithCheckUserServerSideProps();

interface PageProps extends WithCheckUserServerSidePropsResponse {}
export default ({ currentUser }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const { t: devTranslation } = useTranslation('dev');
  const router = useRouter();

  return (
    <Container currentUser={currentUser}>
      <Page setPadding>
        <Text variant='h2' align='center' palette='primary' paletteColor='main'>
          {commonTranslation('sentences.hello_world')}
        </Text>
      </Page>
      <Page setPadding>
        <Text variant='h2' align='center'>
          {devTranslation('words.developer_menu')}
        </Text>
        <ButtonGroup direction='horizontal'>
          <Button isLoading onClick={() => router.push('/dev/ping')}>{devTranslation('words.ping')}</Button>
          <Button onClick={() => router.push('/dev/init')}>{devTranslation('words.generate_test_data')}</Button>
          <Button onClick={() => router.push('/dev/sandbox')}>{devTranslation('words.sandbox')}</Button>
        </ButtonGroup>
      </Page>
    </Container>
  );
};
