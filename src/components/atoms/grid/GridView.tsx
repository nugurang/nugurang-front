import type { CommonComponentProps } from '@/src/components/common';
import Div from '@/src/components/quarks/div/Div';
import React from 'react';
import { UseComponentSizeObject } from '@/src/hooks/useComponentSize';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  column: GridColumnObject;
  gap?: number;
  size: UseComponentSizeObject;
}

interface SectionGridDivProps extends ViewProps {}

const StyledSectionGridDiv = styled(Div)<SectionGridDivProps>`
  ${(props: any) => `
    display: grid;
    grid-template-columns: repeat(${props.column.default}, 1fr);
    gap: ${props.gap ?? 8}px;
    margin: 0 auto;

    ${props.size.width >= props.theme.screenPixelSize.mobile && `
      grid-template-columns: repeat(${props.column.gteMobile ?? props.column.default}, 1fr);
    `}
    ${props.size.width >= props.theme.screenPixelSize.phablet && `
      grid-template-columns: repeat(${props.column.gtePhablet ?? props.column.gteMobile ?? props.column.default}, 1fr);
    `}
    ${props.size.width >= props.theme.screenPixelSize.tablet && `
      grid-template-columns: repeat(${props.column.gteTablet ?? props.column.gtePhablet ?? props.column.gteMobile ?? props.column.default}, 1fr);
    `}
    ${props.size.width >= props.theme.screenPixelSize.laptop && `
      grid-template-columns: repeat(${props.column.gteLaptop ?? props.column.gteTablet ?? props.column.gtePhablet ?? props.column.gteMobile ?? props.column.default}, 1fr);
    `}
    ${props.size.width >= props.theme.screenPixelSize.desktop && `
      grid-template-columns: repeat(${props.column.gteDesktop ?? props.column.gteLaptop ?? props.column.gteTablet ?? props.column.gtePhablet ?? props.column.gteMobile ?? props.column.default}, 1fr);
    `}
  `}
`;

const GridView: React.FC<ViewProps> = props => {
  return (
    <StyledSectionGridDiv {...props} >
      {props.children}
    </StyledSectionGridDiv>
  );
};

export default GridView;
