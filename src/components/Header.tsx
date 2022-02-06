import type { CommonProps, ThemeObject } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import Span from '@/src/components/base/Span';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const height = 64;

type User = {
  name: string;
  imageUrl?: string;
}

interface ComponentProps extends CommonProps {
  callbackUrl?: string;
  user?: User;
}

interface StyledProps extends CommonProps {}

// Header가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDummyDiv = styled(Div)`
  height: ${height}px;
`;

const StyledHeaderWrap = styled.header<StyledProps>`
  ${(props: StyledProps) => `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: ${props.theme.palette.primary.main};
    color: ${props.theme.palette.primary.text};
    height: ${height}px;
    z-index: 20;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledLogoTextWrap = styled(Span)<StyledProps>`
  ${(props: StyledProps) => `
    display: inline-block;
    color: ${props.theme.palette.primary.text};
    font-size: 24px;
    margin-left: 8px;
  `}
`;

const StyledLeftsideWrap = styled(Span)<StyledProps>`
  ${(props: StyledProps) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
  `}
`;

const StyledRightsideWrap = styled(Span)<StyledProps>`
  ${(props: StyledProps) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
  `}
`;

const Header: NextPage<ComponentProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <>
      <StyledDummyDiv />
      <StyledHeaderWrap>
        <WidthLimiter>
          <StyledLeftsideWrap>
            <StyledLogoTextWrap>nugurang</StyledLogoTextWrap>
          </StyledLeftsideWrap>
          <StyledRightsideWrap>
            <Button
              palette='primary'
              onClick={() => router.push({
                pathname: '/session/login',
                query: { callbackUrl: window.location.pathname },
              })}
            >
              { t('login') }
            </Button>
          </StyledRightsideWrap>
        </WidthLimiter>
      </StyledHeaderWrap>
    </>
  );
};

export default Header;
