import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Div from '@/src/components/quarks/div/Div';
import Span from '@/src/components/quarks/span/Span';
import WidthLimiter from '@/src/components/atoms/widthLimiter/WidthLimiter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const height = 64;

type User = {
  name: string;
  imageUrl?: string;
}

interface ComponentProps extends CommonComponentProps {
  callbackUrl?: string;
  user?: User;
}

interface StyledComponentProps extends CommonStyledProps {}

// Header가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDummyDiv = styled(Div)`
  height: ${height}px;
`;

const StyledHeaderWrap = styled.header`
  ${(props: any) => `
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

const StyledLogoTextWrap = styled(Span)`
  ${(props: any) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    color: ${props.theme.palette.primary.text};
    font-size: 24px;
    margin-left: 16px;
  `}
`;

const StyledMenuWrap = styled(Span)`
  ${(props: any) => `
    display: none;
    ${props.theme.screenSizeMediaQuery.gteLaptop} {
      display: flex;
      flex-direction: row;
    }
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
  `}
`;

const Header: React.FC<ComponentProps> = props => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <>
      <StyledDummyDiv />
      <StyledHeaderWrap>
        <WidthLimiter>
          <StyledLogoTextWrap>nugurang</StyledLogoTextWrap>
          <StyledMenuWrap>
            {props.children}
          </StyledMenuWrap>
        </WidthLimiter>
      </StyledHeaderWrap>
    </>
  );
};

export default Header;
