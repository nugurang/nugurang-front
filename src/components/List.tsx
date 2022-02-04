import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
  className?: string;
}

interface ComponentProps extends CssProps {
  ordered?: boolean;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledOl = styled.ol<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    &:not(:first-of-type)::before {
      content: '';
      display: block;
      border-top: 1px solid ${props.theme.palette.default.high};
    }
  `}
`;

const StyledUl = styled.ul<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    width: 100%;
  `}
`;

const ListItem: NextPage<ComponentProps> = ({
  children,
  ordered,
}) => {
  if (ordered) return (
    <StyledOl>
      { children }
    </StyledOl>
  );
  else return (
    <StyledUl>
      { children }
    </StyledUl>
  );
}

export default ListItem;
