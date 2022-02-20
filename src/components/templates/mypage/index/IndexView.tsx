import BriefCard from '@/components/molecules/briefCard/BriefCard';
import BriefUserProfile from '@/components/molecules/briefUserProfile/BriefUserProfile';
import Button from '@/components/atoms/button/Button';
import Dialog from '@/components/molecules/dialog/Dialog';
import Grid from '@/components/atoms/grid/Grid';
import List from '@/components/atoms/list/List';
import PageOverview from '@/components/molecules/pageOverview/PageOverview';
import Section from '@/components/molecules/section/Section';
import WidthLimiter from '@/components/atoms/widthLimiter/WidthLimiter';
import { logoutFromNextAuth } from '@/utils/next-auth';
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
              <BriefCard
                icon={{
                  type: 'fontAwesomeIcon',
                  src: ['fas', 'book-reader']
                }}
                title='보드'
                onClick={() => router.push('/boards')}
              />
            </List>
          </Section>
          <Section
            title='팀'
          >
            <List>
              <BriefCard
                icon={{
                  type: 'fontAwesomeIcon',
                  src: ['fas', 'users']
                }}
                title='팀'
                onClick={() => router.push('/settings')}
              />
            </List>
          </Section>
          <Section
            title='일반'
          >
            <List>
              <BriefCard
                icon={{
                  type: 'fontAwesomeIcon',
                  src: ['fas', 'cog']
                }}
                title='설정'
                subtitle='알림, 테마, 내게 필요한 옵션'
                onClick={() => router.push('/settings')}
              />
              <BriefCard
                icon={{
                  type: 'fontAwesomeIcon',
                  src: ['fas', 'info-circle']
                }}
                title='정보'
                subtitle='웹 앱 정보'
                onClick={() => router.push('/settings')}
              />
              <BriefCard
                icon={{
                  type: 'fontAwesomeIcon',
                  src: ['fas', 'code']
                }}
                title={t('developerOption')}
                subtitle={t('developerOption')}
                onClick={() => router.push('/settings/developer')}
              />
              <BriefCard
                icon={{
                  type: 'fontAwesomeIcon',
                  src: ['fas', 'flask']
                }}
                title={t('sandbox')}
                subtitle={t('sandbox')}
                onClick={() => router.push('/sandbox')}
              />
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
