import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import { CommonStyledAttributes } from '@/src/components/base/common';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  ordered?: boolean;
}

interface StyledComponentProps extends CommonStyledProps {}

const StyledOl = styled.ol<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const StyledUl = styled.ul<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
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
