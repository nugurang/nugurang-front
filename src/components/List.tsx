import type { CommonProps, ThemeObject } from '@/src/components/base/common';

import type { NextPage } from 'next';
import Ol from '@/src/components/base/Ol';
import Ul from '@/src/components/base/Ul';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  ordered?: boolean;
}

interface StyledProps extends CommonProps {}

const StyledOl = styled(Ol)<StyledProps>`
  ${(props: StyledProps) => `
  `}
`;

const StyledUl = styled(Ul)<StyledProps>`
  ${(props: StyledProps) => `
  `}
`;

const ListItem: NextPage<ComponentProps> = props => {
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
    >
      { props.children }
    </StyledUl>
  );
}

export default ListItem;
