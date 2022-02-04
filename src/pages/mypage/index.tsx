import { ellipsis, fontFamily } from '@/src/styles/preset';

import Avatar from '@/src/components/Avatar';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next';
import Image from '@/src/components/Image';
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

const StyledPageOverviewImageWrap = styled(Image)<StyledProps>`
  ${(props: StyledProps) => `
    display: block;
    width: 100%;
    max-height: 480px;
    max-width: 480px;
    margin: 0 auto;
    vertical-align: top;
  `}
`;

const StyledPageOverviewTextWrap = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    margin-top: 10px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  `}
`;

const StyledUserBriefProfileAvatar = styled(Avatar)<StyledProps>`
  ${(props: StyledProps) => `
    height: 72px;
    width: 72px;
    margin-right: 16px;
  `}
`;

const StyledUserBriefProfileTextGroupDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    display: inline-block;
    margin: 4px 0;
    vertical-align: top;
  `}
`;

const StyledUserBriefProfileNameDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    ${ellipsis}
    ${fontFamily}
  `}
`;

const StyledUserBriefProfileEmailDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
    ${ellipsis}
    ${fontFamily}
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
                <StyledPageOverviewImageWrap
                  src='https://image.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg'
                />
                <StyledPageOverviewTextWrap>
                  {t('_pleaseLogin')}
                </StyledPageOverviewTextWrap>
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
                <StyledUserBriefProfileAvatar
                  src={currentUser.image.address}
                />
                <StyledUserBriefProfileTextGroupDiv>
                  <StyledUserBriefProfileNameDiv>
                    {currentUser.name}
                  </StyledUserBriefProfileNameDiv>
                  <StyledUserBriefProfileEmailDiv>
                    {currentUser.email}
                  </StyledUserBriefProfileEmailDiv>
                </StyledUserBriefProfileTextGroupDiv>
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
    </Container>
  );
}

export default MyPageIndex;
