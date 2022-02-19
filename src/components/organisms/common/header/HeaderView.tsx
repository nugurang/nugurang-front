import type { CommonComponentProps } from '@/components/common';
import Div from '@/components/quarks/div/Div';
import Span from '@/components/quarks/span/Span';
import WidthLimiter from '@/components/atoms/widthLimiter/WidthLimiter';
import styled from '@emotion/styled';

const height = 64;

type User = {
  name: string;
  imageUrl?: string;
}

interface ComponentProps extends CommonComponentProps {
  callbackUrl?: string;
  user?: User;
}

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

const HeaderView: React.FC<ComponentProps> = props => {
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

export default HeaderView;
