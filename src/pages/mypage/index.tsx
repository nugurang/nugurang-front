import Avatar from '@/src/components/Avatar';
import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import DualDiv from '@/src/components/DualDiv';
import { GetServerSideProps } from 'next';
import Image from '@/src/components/Image';
import LoginProviderSelector from '@/src/components/LoginProviderSelector';
import type { NextPage } from 'next';
import type { ThemeObject } from '@/src/styles/theme';
import { ellipsis } from '@/src/styles/preset';
import { getWindowLocation } from '@/src/utils/url';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

interface PageProps {
  currentUser: any,
  pathname: string,
}

interface StyledWrapProps {
  theme: ThemeObject;
}

const StyledLoginHeaderImageWrap = styled(Image)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    width: 100%;
    max-height: 480px;
    max-width: 480px;
    margin: 0 auto;
    vertical-align: top;
  `}
`;

const StyledLoginHeaderTextWrap = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    margin-top: 10px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  `}
`;

const StyledLoginProviderSelector = styled(LoginProviderSelector)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    margin-top: 50px;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      margin-top: 0;
      display: block;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      width: inherit;
    }
  `}
`;

const UserBriefProfileAvatar = styled(Avatar)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    height: 72px;
    width: 72px;
  `}
`;

const UserBriefProfileTextGroupDiv = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    margin: 4px 0 4px 16px;
    vertical-align: top;
  `}
`;

const UserBriefProfileNameDiv = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    font-size: 24px;
    line-height: 32px;
    ${ellipsis}
  `}
`;

const UserBriefProfileEmailDiv = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
    ${ellipsis}
  `}
`;

const MyPageIndex: NextPage<PageProps> = ({ currentUser, pathname }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <Container
      currentUser={currentUser}
      header
      footer
      navigationBar
      pathname={pathname}
    >
      {
        !currentUser && (
          <DualDiv
            firstChild={
              <Card>
                <StyledLoginHeaderImageWrap
                  src='https://image.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg'
                ></StyledLoginHeaderImageWrap>
                <StyledLoginHeaderTextWrap>
                  {t('_pleaseLogin')}
                </StyledLoginHeaderTextWrap>
              </Card>
            }
            secondChild={
              <Card>
                <StyledLoginProviderSelector />
              </Card>
            }
          />
        )
      }
      {
        currentUser && (
          <DualDiv
            firstChild={
              <Card>
                <UserBriefProfileAvatar
                  src={currentUser.image.address}
                />
                <UserBriefProfileTextGroupDiv>
                  <UserBriefProfileNameDiv>
                    {currentUser.name}
                  </UserBriefProfileNameDiv>
                  <UserBriefProfileEmailDiv>
                    {currentUser.email}
                  </UserBriefProfileEmailDiv>
                </UserBriefProfileTextGroupDiv>
              </Card>
            }
            secondChild={
              <Card>
                <Button
                  fullwidth
                  onClick={() => router.push({
                    pathname: '/session/logout',
                    query: {
                      callbackUrl: getWindowLocation()
                    },
                  })}
                >
                  {t('logout')}
                </Button>
              </Card>
            }
          />
        )
      }
    </Container>
  );
}

export default MyPageIndex;
