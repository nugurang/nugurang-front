import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {}

interface StyledProps extends CommonProps {}

const StyledWrapDiv = styled(Div)<StyledProps>`
  ${(props: any) => `
    ${props.css || ''}
  `}
`;

const Card: NextPage<ComponentProps> = props => {
  return (
    <StyledWrapDiv
      className={props.className}
      css={props.css}
      palette={props.palette}
      variant={props.variant}
    >
      { props.children }
    </StyledWrapDiv>
  );
}

export default Card;
