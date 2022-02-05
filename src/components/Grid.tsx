import type { CommonProps, ThemeObject } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRef } from 'react';
import useResize from '@/src/hooks/useResize';

type Column = {
  default: number;
  gteMobile?: number;
  gtePhablet?: number;
  gteTablet?: number;
  gteLaptop?: number;
  gteDesktop?: number;
}

type Size = {
  width: number;
}

interface ComponentProps extends CommonProps {
  column: Column;
  gap?: number;
}

interface StyledProps extends CommonProps {
  column: Column;
  gap?: number;
  size: Size;
}

const StyledSectionGridDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    display: grid;
    grid-template-columns: repeat(${props.column.default}, 1fr);
    gap: ${props.gap ?? '8px'};
    margin: 0 auto;

    ${props.size.width >= props.theme.screenPixelSize.mobile && `
      grid-template-columns: repeat(${props.column.gteMobile}, 1fr);
      max-width: ${props.theme.screenPixelSize.mobile};
    `}
    ${props.size.width >= props.theme.screenPixelSize.phablet && `
      grid-template-columns: repeat(${props.column.gtePhablet}, 1fr);
      max-width: ${props.theme.screenPixelSize.phablet};
    `}
    ${props.size.width >= props.theme.screenPixelSize.tablet && `
      grid-template-columns: repeat(${props.column.gteTablet}, 1fr);
      max-width: ${props.theme.screenPixelSize.tablet};
    `}
    ${props.size.width >= props.theme.screenPixelSize.laptop && `
      grid-template-columns: repeat(${props.column.gteLaptop}, 1fr);
      max-width: ${props.theme.screenPixelSize.laptop};
    `}
    ${props.size.width >= props.theme.screenPixelSize.desktop && `
      grid-template-columns: repeat(${props.column.gteDesktop}, 1fr);
      max-width: ${props.theme.screenPixelSize.desktop};
    `}
  `}
`;

const Grid: NextPage<ComponentProps> = ({
  className,
  children,
  column
}) => {
  const componentRef = useRef();
  const size = useResize(componentRef);
  column = { ...column, gteMobile:  column.gteMobile  ?? column.default    };
  column = { ...column, gtePhablet: column.gtePhablet ?? column.gteMobile  };
  column = { ...column, gteTablet:  column.gteTablet  ?? column.gtePhablet };
  column = { ...column, gteLaptop:  column.gteLaptop  ?? column.gteTablet  };
  column = { ...column, gteDesktop: column.gteDesktop ?? column.gteLaptop  };
  return (
    <StyledSectionGridDiv
      ref={componentRef}
      className={className}
      column={column}
      size={size}
    >
      {children}
    </StyledSectionGridDiv>
  );
}

export default Grid;
