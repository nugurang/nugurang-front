import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import type { ThemeObject } from '@/src/components/base/common';
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
  className?: string;
}

interface ComponentProps extends CssProps {
  firstChildren: React.ReactNode;
  secondChildren?: React.ReactNode;
}

interface StyledProps extends CssProps {
  theme: ThemeObject;
}

const StyledGridDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    margin: 0 auto;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      grid-template-columns: repeat(2, 1fr);
      max-width: ${props.theme.screenSize.tablet};
    }
  `}
`;

const StyledGridItemDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    margin: auto 0;
    max-height: 50vh;
  `}
`;

const PageOverview: NextPage<ComponentProps> = ({
  className,
  css,
  firstChildren,
  secondChildren,
}) => {
  return (
    <StyledGridDiv>
      <StyledGridItemDiv
        className={className}
        css={css}
      >
        {firstChildren}
      </StyledGridItemDiv>
      <StyledGridItemDiv
        className={className}
        css={css}
      >
        {secondChildren}
      </StyledGridItemDiv>
    </StyledGridDiv>
  );
}

export default PageOverview;
