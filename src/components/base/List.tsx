import { CommonProps, CommonStyledAttributes } from '@/src/components/base/common';

import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  ordered?: boolean;
}

interface StyledProps extends CommonProps {}

const StyledOl = styled.ol<StyledProps>`
  ${(props: StyledProps) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const StyledUl = styled.ul<StyledProps>`
  ${(props: StyledProps) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const List: NextPage<ComponentProps> = props => {
  if (props.ordered) return (
    <StyledOl
      className={props.className}
    >
      { props.children }
    </StyledOl>
  );
  else return (
    <StyledUl
      className={props.className}
      variant={props.variant}
      palette={props.palette}
    >
      { props.children }
    </StyledUl>
  );
}

export default List;
