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
    margin: 16px 8px;
  `}
`;

const Section: NextPage = ({
  children,
}) => {
  return (
    <StyledCard
      variant='transparent'
    >
      { children }
    </StyledCard>
  );
}

export default Section;
