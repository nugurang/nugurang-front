import BriefCard from '@/src/components/molecules/briefCard/BriefCard';
import BriefUserProfile from '@/src/components/molecules/briefUserProfile/BriefUserProfile';
import Button from '@/src/components/atoms/button/Button';
import Dialog from '@/src/components/molecules/dialog/Dialog';
import Grid from '@/src/components/atoms/grid/Grid';
import List from '@/src/components/atoms/list/List';
import ListItem from '@/src/components/atoms/listItem/ListItem';
import PageOverview from '@/src/components/molecules/pageOverview/PageOverview';
import Section from '@/src/components/molecules/section/Section';
import WidthLimiter from '@/src/components/atoms/widthLimiter/WidthLimiter';
import { logoutFromNextAuth } from '@/src/utils/next-auth';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface ViewProps {
  currentUser: any;
  logoutState: any;
  updateLogoutState: (value: any) => void;
}

const MyPageIndexView: React.FC<ViewProps> = props => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <>
      <WidthLimiter>
        <Section
          variant='transparent'
        >
          <PageOverview
            firstChildren={<>
              <BriefUserProfile
                name={props.currentUser.name}
                email={props.currentUser.email}
                imageUrl={props.currentUser.image.address}
              />
            </>}
            secondChildren={<>
              <Button
                onClick={() => props.updateLogoutState({
                  isDialogOpen: true
                })}
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
        open={props.logoutState.isDialogOpen}
        onClickBackdrop={(props.logoutState.isDialogOpen && props.logoutState.isPending) ? undefined : () => props.updateLogoutState({
          isDialogOpen: false
        })}
        loader={props.logoutState.isPending}
        title={props.logoutState.isPending ? t('_loggingOut') : t('_areYouSureLogout')}
        noLabel={t('logout')}
        onNo={(props.logoutState.isDialogOpen && props.logoutState.isPending) ? undefined : () => {
          props.updateLogoutState({
            pending: true
          });
          logoutFromNextAuth({callbackUrl: `/session/logout/callback?callbackUrl=${window.location.pathname}` });
        }}
        onCancel={(props.logoutState.isDialogOpen && props.logoutState.isPending) ? undefined : () => props.updateLogoutState({
          isDialogOpen: false
        })}
      />
    </>
  );
}

export default MyPageIndexView;
