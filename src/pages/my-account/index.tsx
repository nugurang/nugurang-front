import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Container from '@/compositions/container/Container';
import Page from '@/compositions/page/Page';
import Text from '@/components/text/Text';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { logout } from '@/services/oAuth2/index';

export const getServerSideProps = WithCheckUserServerSideProps();

interface PageProps extends WithCheckUserServerSidePropsResponse {}
export default ({ currentUser }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  return (
    <Container currentUser={currentUser}>
      <Page setPadding>
        <Text variant='h2' align='center' palette='primary' paletteColor='main'>
          {commonTranslation('words.my_account')}
        </Text>
        <Text variant='p' align='center'>
          {currentUser.name}
        </Text>
        <ButtonGroup direction='horizontal'>
          <Button
            fillVariant='filled'
            palette='error'
            onClick={logout}
          >
            {commonTranslation('words.sign_out')}
          </Button>
        </ButtonGroup>
      </Page>
    </Container>
  );
};
