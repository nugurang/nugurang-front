import Li from '@/src/components/base/Li';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
  className?: string;
}

interface ComponentProps extends CssProps {}

interface StyledWrapProps extends CssProps {}

const StyledLi = styled(Li)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    width: 100%;
  `}
`;

const ListItem: NextPage<ComponentProps> = ({
  className,
  children,
}) => {
  return (
    <StyledLi
      className={className}
      variant='transparent'
    >
      { children }
    </StyledLi>
  );
}

export default ListItem;
