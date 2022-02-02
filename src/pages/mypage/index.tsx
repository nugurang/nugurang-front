import Avatar from '@/src/components/Avatar';
import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import DualDiv from '@/src/components/DualDiv';
import { GetServerSideProps } from 'next';
import Image from '@/src/components/Image';
import LoginButtonGroup from '@/src/components/LoginButtonGroup';
import LogoutButton from '@/src/components/LogoutButton';
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
  callbackUrl: string,
}

interface StyledProps {
  theme: ThemeObject;
}

const StyledBannerGridDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`;

const StyledBannerGridItemCard = styled(Card)<StyledProps>`
  ${(props: StyledProps) => `
    margin: auto 0;
  `}
`;

const StyledLoginHeaderImageWrap = styled(Image)<StyledProps>`
  ${(props: StyledProps) => `
    display: block;
    width: 100%;
    max-height: 480px;
    max-width: 480px;
    margin: 0 auto;
    vertical-align: top;
  `}
`;

const StyledLoginHeaderTextWrap = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    margin-top: 10px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  `}
`;

const UserBriefProfileAvatar = styled(Avatar)<StyledProps>`
  ${(props: StyledProps) => `
    height: 72px;
    width: 72px;
  `}
`;

const UserBriefProfileTextGroupDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    display: inline-block;
    margin: 4px 0 4px 16px;
    vertical-align: top;
  `}
`;

const UserBriefProfileNameDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 24px;
    line-height: 32px;
    ${ellipsis}
  `}
`;

const UserBriefProfileEmailDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
    ${ellipsis}
  `}
`;

const MyPageIndex: NextPage<PageProps> = ({ currentUser, callbackUrl }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <Container
      callbackUrl={callbackUrl}
      currentUser={currentUser}
      header
      footer
      navigationBar
    >
      {
        !currentUser && (
          <StyledBannerGridDiv>
            <StyledBannerGridItemCard>
              <StyledLoginHeaderImageWrap
                src='https://image.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg'
              ></StyledLoginHeaderImageWrap>
              <StyledLoginHeaderTextWrap>
                {t('_pleaseLogin')}
              </StyledLoginHeaderTextWrap>
            </StyledBannerGridItemCard>
            <StyledBannerGridItemCard>
              <LoginButtonGroup
                callbackUrl={callbackUrl}
              />
            </StyledBannerGridItemCard>
          </StyledBannerGridDiv>
        )
      }
      {
        currentUser && (
          <StyledBannerGridDiv>
            <StyledBannerGridItemCard>
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
            </StyledBannerGridItemCard>
            <StyledBannerGridItemCard>
              <LogoutButton 
                callbackUrl={callbackUrl}
              />
            </StyledBannerGridItemCard>
          </StyledBannerGridDiv>
        )
      }
    </Container>
  );
}

export default MyPageIndex;
