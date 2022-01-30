import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next';
import Image from '@/src/components/Image';
import LoginProviderSelector from '@/src/components/LoginProviderSelector';
import type { NextPage } from 'next';
import type { ThemeObject } from '@/src/styles/theme';
import { getWindowLocation } from '@/src/utils/url';
import styled from 'styled-components';
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

const StyledLoginDivWrap = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: relative;
  `}
`;

const StyledLoginHeaderDivWrap = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      display: inline-block;
      width: 50%;
      vertical-align: top;
    }
  `}
`;

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

const StyledLoginProviderSelectorDivWrap = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      display: inline-block;
      width: 50%;
      min-height: 480px;
      vertical-align: top;
    }
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
          <StyledLoginDivWrap>
            <StyledLoginHeaderDivWrap>
              <StyledLoginHeaderImageWrap
                src='https://image.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg'
              ></StyledLoginHeaderImageWrap>
              <StyledLoginHeaderTextWrap>
                {t('_pleaseLogin')}
              </StyledLoginHeaderTextWrap>
            </StyledLoginHeaderDivWrap>
            <StyledLoginProviderSelectorDivWrap>
              <StyledLoginProviderSelector />
            </StyledLoginProviderSelectorDivWrap>
          </StyledLoginDivWrap>
        )
      }
      {
        currentUser && (
          <>
            {currentUser.name}
              <Button
                onClick={() => router.push({
                  pathname: '/session/logout',
                  query: {
                    callbackUrl: getWindowLocation()
                  },
                })}
              >
                {t('logout')}
              </Button>
          </>
        )
      }
    </Container>
  );
}

export default MyPageIndex;
