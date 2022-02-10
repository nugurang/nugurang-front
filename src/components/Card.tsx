import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledWrapDiv = styled(Div)`
  ${(props: any) => `
    ${props.css || ''}
  `}
`;

const Card: React.FC<ComponentProps> = props => {
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
