import BriefCard from '@/src/components/BriefCard';
import BriefUserProfile from '@/src/components/BriefUserProfile';
import Container from '@/src/components/Container';
import Div from '@/src/components/base/Div';
import { GetServerSideProps } from 'next';
import Grid from '@/src/components/Grid';
import Img from '@/src/components/base/Img';
import List from '@/src/components/List';
import ListItem from '@/src/components/ListItem';
import LoginButtonGroup from '@/src/components/LoginButtonGroup';
import LogoutButton from '@/src/components/LogoutButton';
import type { NextPage } from 'next';
import PageOverview from '@/src/components/PageOverview';
import Section from '@/src/components/Section';
import type { ThemeObject } from '@/src/styles/theme';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

interface PageProps {
  currentUser: any,
  callbackUrl: string,
}

interface StyledProps {
  theme: ThemeObject;
}

const StyledPageOverviewLoginImageWrap = styled(Img)<StyledProps>`
  ${(props: StyledProps) => `
    display: block;
    width: 100%;
    max-height: 480px;
    max-width: 480px;
    margin: 0 auto;
    vertical-align: top;
  `}
`;

const StyledPageOverviewLoginTextWrap = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    margin-top: 10px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  `}
`;

const MyPageIndex: NextPage<PageProps> = ({ currentUser, callbackUrl }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <Container
      callbackUrl={callbackUrl}
      currentUser={currentUser}
    >
      <Section
        variant='transparent'
      >
        {
          !currentUser && (
            <PageOverview
              firstChildren={<>
                <StyledPageOverviewLoginImageWrap
                  src='https://image.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg'
                />
                <StyledPageOverviewLoginTextWrap>
                  {t('_pleaseLogin')}
                </StyledPageOverviewLoginTextWrap>
              </>}
              secondChildren={<>
                <LoginButtonGroup
                  callbackUrl={callbackUrl}
                />
              </>}
            />
          )
        }
        {
          currentUser && (
            <PageOverview
              firstChildren={<>
                <BriefUserProfile
                  name={currentUser.name}
                  email={currentUser.email}
                  imageUrl={currentUser.image.address}
                />
              </>}
              secondChildren={<>
                <LogoutButton 
                  callbackUrl={callbackUrl}
                />
              </>}
            />
          )
        }
      </Section>
      <Grid
        column={{
          default: 1,
          gteTablet: 2,
          gteDesktop: 3
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
                onClick={() => router.push('/settings')}
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
          </List>
        </Section>
      </Grid>
    </Container>
  );
}

export default MyPageIndex;
