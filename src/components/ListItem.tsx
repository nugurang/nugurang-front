import Card from '@/src/components/Card';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
  className?: string;
}

interface StyledWrapProps extends CssProps {}

const StyledCard = styled(Card)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    width: 100%;
  `}
`;

const ListItem: NextPage = ({
  children,
}) => {
  return (
    <li>
      <StyledCard
        variant='transparent'
      >
        { children }
      </StyledCard>
    </li>
  );
}

export default ListItem;
