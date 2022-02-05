import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Card from '@/src/components/Card';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {}

interface StyledWrapProps extends CommonProps {}

const StyledCard = styled(Card)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    margin: 16px 8px;
  `}
`;

const Section: NextPage<ComponentProps> = props => {
  return (
    <StyledCard
      variant='acrylic'
      palette='default'
    >
      { props.children }
    </StyledCard>
  );
}

export default Section;
