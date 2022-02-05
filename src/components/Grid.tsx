import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import type { ThemeObject } from '@/src/styles/theme';
import styled from '@emotion/styled';
import { useRef } from 'react';
import useResize from '@/src/hooks/useResize';

interface CssProps {
  className?: string;
  css?: string;
  column: {
    default: number;
    gteMobile?: number;
    gtePhablet?: number;
    gteTablet?: number;
    gteLaptop?: number;
    gteDesktop?: number;
  }
}

interface PageProps extends CssProps {}

interface StyledProps extends CssProps {
  theme: ThemeObject;
  size: {
    width: number;
  }
}

const StyledSectionGridDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    display: grid;
    grid-template-columns: repeat(${props.column.default}, 1fr);
    gap: 10px;
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

const Grid: NextPage<PageProps> = ({
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
