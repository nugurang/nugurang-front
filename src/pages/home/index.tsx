import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Container from '@/compositions/container/Container';
import Section from '@/compositions/page/Section';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import Article from '@/compositions/page/Article';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';

export const getServerSideProps = WithCheckUserServerSideProps();

interface PageProps extends WithCheckUserServerSidePropsResponse {}
export default ({ currentUser }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const { t: devTranslation } = useTranslation('dev');
  const router = useRouter();

  return (
    <Container currentUser={currentUser}>
      <Page>
        <Sidebar>Left</Sidebar>
        <Main>
          <Section backButton={false} title={commonTranslation('sentences.hello_world')}>
            <Article title={commonTranslation('sentences.hello_world')}>
            </Article>
          </Section>
          <Section backButton={false}>
            <Article title={devTranslation('words.developer_menu')}>
              <ButtonGroup direction='horizontal'>
                <Button isLoading onClick={() => router.push('/dev/ping')}>{devTranslation('words.ping')}</Button>
                <Button palette='error' onClick={() => router.push('/dev/init')}>{devTranslation('words.generate_test_data')}</Button>
                <Button onClick={() => router.push('/dev/sandbox')}>{devTranslation('words.sandbox')}</Button>
              </ButtonGroup>
            </Article>
          </Section>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
    </Container>
  );
};
