import type { CommonProps, ThemeObject } from '@/src/components/base/common';

import Li from '@/src/components/base/Li';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {}

interface StyledWrapProps extends CommonProps {}

const StyledLi = styled(Li)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    width: 100%;
  `}
`;

const ListItem: NextPage<ComponentProps> = props => {
  return (
    <StyledLi
      className={props.className}
      variant='transparent'
    >
      { props.children }
    </StyledLi>
  );
}

export default ListItem;
