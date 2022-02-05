import type { NextPage } from 'next';
import Ol from '@/src/components/base/Ol';
import type { ThemeObject } from '@/src/components/base/common';
import Ul from '@/src/components/base/Ul';
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
  className?: string;
}

interface ComponentProps extends CssProps {
  ordered?: boolean;
}

interface StyledProps extends CssProps {
  theme: ThemeObject;
}

const commonStyled = (props: StyledProps) => `
  &:not(:first-of-type)::before {
    content: '';
    display: block;
    border-top: 1px solid ${props.theme.palette.default.high};
  }
`;

const StyledOl = styled(Ol)<StyledProps>`
  ${(props: StyledProps) => `
    ${commonStyled}
  `}
`;

const StyledUl = styled(Ul)<StyledProps>`
  ${(props: StyledProps) => `
    ${commonStyled}
  `}
`;

const ListItem: NextPage<ComponentProps> = ({
  children,
  className,
  ordered,
}) => {
  if (ordered) return (
    <StyledOl
      className={className}
    >
      { children }
    </StyledOl>
  );
  else return (
    <StyledUl
      className={className}
    >
      { children }
    </StyledUl>
  );
}

export default ListItem;
