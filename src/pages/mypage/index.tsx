import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next';
import Image from '@/src/components/Image';
import LoginProviderSelector from '@/src/components/LoginProviderSelector';
import type { NextPage } from 'next';
import type { ThemeObject } from '@/src/styles/theme';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { withServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withServerSideProps();

interface PageProps {
  currentOAuth2User: any,
  pathname: string,
}

interface StyledWrapProps {
  theme: ThemeObject;
}

const StyledLoginCardWrap = styled(Card)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: relative;
  `}
`;

const StyledLoginHeaderCardWrap = styled(Card)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    ${props.theme.screenSizeMediaQuery.gtTablet} {
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

const StyledLoginProviderSelectorCardWrap = styled(Card)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    ${props.theme.screenSizeMediaQuery.gtTablet} {
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
    ${props.theme.screenSizeMediaQuery.gtTablet} {
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

const MyPageIndex: NextPage<PageProps> = ({ currentOAuth2User, pathname }) => {
  const { t } = useTranslation('common');
  return (
    <Container
      currentOAuth2User={currentOAuth2User}
      header
      footer
      navigationBar
      pathname={pathname}
    >
      <StyledLoginCardWrap>
        <StyledLoginHeaderCardWrap>
          <StyledLoginHeaderImageWrap
            src='https://image.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg'
          ></StyledLoginHeaderImageWrap>
          <StyledLoginHeaderTextWrap>
            {t('_pleaseLogin')}
          </StyledLoginHeaderTextWrap>
        </StyledLoginHeaderCardWrap>
        <StyledLoginProviderSelectorCardWrap>
          <StyledLoginProviderSelector />
        </StyledLoginProviderSelectorCardWrap>
      </StyledLoginCardWrap>
    </Container>
  );
}

export default MyPageIndex;
