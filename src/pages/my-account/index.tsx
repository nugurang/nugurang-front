import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Container from '@/compositions/container/Container';
import Section from '@/compositions/page/Section';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { logout } from '@/services/oAuth2/index';
import Article from '@/compositions/page/Article';
import UserDashboard from '@/compositions/user/UserDashboard';
import Dialog from '@/compositions/common/Dialog';
import { useState } from 'react';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';

export const getServerSideProps = WithCheckUserServerSideProps();

interface PageProps extends WithCheckUserServerSidePropsResponse {}
export default ({ currentUser }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [isLogoutOngoing, setLogoutOngoing] = useState<boolean>(false);

  const handleClickLogoutButton = () => {
    setLogoutModalOpen(true);
  };
  const handleClickLogoutYesButton = () => {
    setLogoutOngoing(true);
    logout();
  };
  const handleClickLogoutNoButton = () => {
    setLogoutModalOpen(false);
  };

  return (
    <Container currentUser={currentUser}>
      <Page>
        <Main>
          <Section title={commonTranslation('words.my_account')}>
            <Article>
              <UserDashboard
                user={currentUser}
                onClickLogoutButton={handleClickLogoutButton}
              />
            </Article>
          </Section>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
      <Dialog
        open={isLogoutModalOpen}
        title={commonTranslation('words.sign_out')}
        content={commonTranslation('sentences.are_you_sure_to_sign_out')}
        onClickBackdrop={handleClickLogoutNoButton}
      >
        <ButtonGroup>
          <Button
            fillVariant='filled'
            palette='error'
            isLoading={isLogoutOngoing}
            onClick={handleClickLogoutYesButton}
          >
            {commonTranslation('words.yes')}
          </Button>
          <Button
            fillVariant='filled'
            palette='default'
            onClick={handleClickLogoutNoButton}
          >
            {commonTranslation('words.no')}
          </Button>
        </ButtonGroup>
      </Dialog>
    </Container>
  );
};
