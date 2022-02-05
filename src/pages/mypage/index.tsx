import BriefUserProfile from '@/src/components/BriefUserProfile';
import Card from '@/src/components/Card';
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
      <Section>
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
        <Section>
          <List>
            <ListItem>
              <Card>
                설정
              </Card>
            </ListItem>
          </List>
        </Section>
        <Section>
          <List>
            <ListItem>
              설정
            </ListItem>
          </List>
        </Section>
        <Section>
          <List>
            <ListItem>
              설정
            </ListItem>
          </List>
        </Section>
      </Grid>
    </Container>
  );
}

export default MyPageIndex;
