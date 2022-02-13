import BriefCard from '@/src/components/molecules/briefCard/BriefCard';
import BriefUserProfile from '@/src/components/molecules/briefUserProfile/BriefUserProfile';
import Button from '@/src/components/atoms/button/Button';
import Dialog from '@/src/components/molecules/dialog/Dialog';
import { GetServerSideProps } from 'next';
import Grid from '@/src/components/atoms/grid/Grid';
import List from '@/src/components/atoms/list/List';
import ListItem from '@/src/components/atoms/listItem/ListItem';
import type { NextPage } from 'next';
import PageOverview from '@/src/components/molecules/pageOverview/PageOverview';
import Section from '@/src/components/molecules/section/Section';
import WidthLimiter from '@/src/components/atoms/widthLimiter/WidthLimiter';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { logoutFromNextAuth } from '@/src/utils/next-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('user');

interface PageProps {
  currentUser: any
}

const MyPageIndex: NextPage<PageProps> = ({ currentUser }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLogoutPending, setIsLogoutPending] = useState(false);
  return (
    <>
      <WidthLimiter>
        <Section
          variant='transparent'
        >
          <PageOverview
            firstChildren={<>
              <BriefUserProfile
                name={currentUser.name}
                email={currentUser.email}
                imageUrl={currentUser.image.address}
              />
            </>}
            secondChildren={<>
              <Button
                onClick={() => setIsLogoutDialogOpen(true)}
                palette='danger'
              >
                {t('logout')}
              </Button>
            </>}
          />
        </Section>
        <Grid
          column={{
            default: 1,
            gtePhablet: 2,
            gteLaptop: 3
          }}
        >
          <Section
            title='보드'
          >
            <List>
              <ListItem>
                <BriefCard
                  icon={{
                    type: 'fontAwesomeIcon',
                    src: ['fas', 'book-reader']
                  }}
                  title='보드'
                  onClick={() => router.push('/boards')}
                />
              </ListItem>
            </List>
          </Section>
          <Section
            title='팀'
          >
            <List>
              <ListItem>
                <BriefCard
                  icon={{
                    type: 'fontAwesomeIcon',
                    src: ['fas', 'users']
                  }}
                  title='팀'
                  onClick={() => router.push('/settings')}
                />
              </ListItem>
            </List>
          </Section>
          <Section
            title='일반'
          >
            <List>
              <ListItem>
                <BriefCard
                  icon={{
                    type: 'fontAwesomeIcon',
                    src: ['fas', 'cog']
                  }}
                  title='설정'
                  subtitle='알림, 테마, 내게 필요한 옵션'
                  onClick={() => router.push('/settings')}
                />
              </ListItem>
              <ListItem>
                <BriefCard
                  icon={{
                    type: 'fontAwesomeIcon',
                    src: ['fas', 'info-circle']
                  }}
                  title='정보'
                  subtitle='웹 앱 정보'
                  onClick={() => router.push('/settings')}
                />
              </ListItem>
              <ListItem>
                <BriefCard
                  icon={{
                    type: 'fontAwesomeIcon',
                    src: ['fas', 'code']
                  }}
                  title={t('developerOption')}
                  subtitle={t('developerOption')}
                  onClick={() => router.push('/settings/developer')}
                />
              </ListItem>
              <ListItem>
                <BriefCard
                  icon={{
                    type: 'fontAwesomeIcon',
                    src: ['fas', 'flask']
                  }}
                  title={t('sandbox')}
                  subtitle={t('sandbox')}
                  onClick={() => router.push('/sandbox')}
                />
              </ListItem>
            </List>
          </Section>
        </Grid>
      </WidthLimiter>
      <Dialog
        open={isLogoutDialogOpen}
        onClickBackdrop={(isLogoutDialogOpen && isLogoutPending) ? undefined : () => setIsLogoutDialogOpen(false)}
        loader={isLogoutPending}
        title={isLogoutPending ? t('_loggingOut') : t('_areYouSureLogout')}
        noLabel={t('logout')}
        onNo={(isLogoutDialogOpen && isLogoutPending) ? undefined : () => {
          setIsLogoutPending(true);
          logoutFromNextAuth({callbackUrl: `/session/logout/callback?callbackUrl=${window.location.pathname}` });
        }}
        onCancel={(isLogoutDialogOpen && isLogoutPending) ? undefined : () => setIsLogoutDialogOpen(false)}
      />
    </>
  );
}

export default WithCommonPreferences(MyPageIndex);