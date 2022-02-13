import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Div from '@/src/components/quarks/div/Div';
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

interface ComponentProps extends CommonComponentProps {
  column: Column;
  gap?: number;
}

interface StyledComponentProps extends CommonStyledProps {
  ref: HTMLDivElement;
  column: Column;
  gap?: number;
  size: Size;
}

const StyledSectionGridDiv = styled(Div)<StyledComponentProps>`
  ${(props: any) => `
    display: grid;
    grid-template-columns: repeat(${props.column.default}, 1fr);
    gap: ${props.gap ?? '8px'};
    margin: 0 auto;

    ${props.size.width >= props.theme.screenPixelSize.mobile && `
      grid-template-columns: repeat(${props.column.gteMobile}, 1fr);
    `}
    ${props.size.width >= props.theme.screenPixelSize.phablet && `
      grid-template-columns: repeat(${props.column.gtePhablet}, 1fr);
    `}
    ${props.size.width >= props.theme.screenPixelSize.tablet && `
      grid-template-columns: repeat(${props.column.gteTablet}, 1fr);
    `}
    ${props.size.width >= props.theme.screenPixelSize.laptop && `
      grid-template-columns: repeat(${props.column.gteLaptop}, 1fr);
    `}
  `}
`;

const Grid: React.FC<ComponentProps> = ({
  className,
  children,
  column
}) => {
  const ref = useRef();
  const size = useResize(ref);
  column = { ...column, gteMobile:  column.gteMobile  ?? column.default    };
  column = { ...column, gtePhablet: column.gtePhablet ?? column.gteMobile  };
  column = { ...column, gteTablet:  column.gteTablet  ?? column.gtePhablet };
  column = { ...column, gteLaptop:  column.gteLaptop  ?? column.gteTablet  };
  column = { ...column, gteDesktop: column.gteDesktop ?? column.gteLaptop  };
  return (
    <StyledSectionGridDiv
      className={className}
      ref={ref}
      column={column}
      size={size}
    >
      {children}
    </StyledSectionGridDiv>
  );
}

export default Grid;
