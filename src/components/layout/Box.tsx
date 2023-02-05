import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface BoxProps {
  centerizeHorizontally?: boolean;
  centerizeVertically?: boolean;
  setPaddingHorizontally?: boolean;
  setPaddingVertically?: boolean;
  gap?: string;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
}
const Box = styled.div<BoxProps>`
  ${props => (`
    &>*:not(:first-child) {
      margin-top: ${props.gap ?? '16px'};
    }`)
  }
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  ${props => (props.centerizeHorizontally ? 'align-items: center;' : '')}
  ${props => (props.centerizeVertically ? 'justify-content: center;' : '')}
  ${props => (props.setPaddingHorizontally ? 'padding-left: 16px; padding-right: 16px;' : '')}
  ${props => (props.setPaddingVertically ? 'padding-top: 16px; padding-bottom: 16px;' : '')}
  ${props => (props.height ? `height: ${props.height};` : '')}
  ${props => (props.width ? `width: ${props.width};` : '')}
  ${props => (props.maxHeight ? `max-height: ${props.maxHeight};` : '')}
  ${props => (props.maxWidth ? `max-width: ${props.maxWidth};` : '')}
  ${props => (props.minHeight ? `min-height: ${props.minHeight};` : '')}
  ${props => (props.minWidth ? `min-width: ${props.minWidth};` : '')}
`;

interface Props {
  children: ReactNode | string;
  centerizeHorizontally?: boolean;
  centerizeVertically?: boolean;
  setPaddingHorizontally?: boolean;
  setPaddingVertically?: boolean;
  gap?: string;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
}
export default (props: Props) => {
  const {
    children,
    centerizeHorizontally,
    centerizeVertically,
    setPaddingHorizontally,
    setPaddingVertically,
    gap,
    height,
    width,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
  } = props;

  return (
    <Box
      centerizeHorizontally={centerizeHorizontally ?? false}
      centerizeVertically={centerizeVertically ?? false}
      setPaddingHorizontally={setPaddingHorizontally ?? false}
      setPaddingVertically={setPaddingVertically ?? false}
      gap={gap}
      height={height}
      width={width}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minHeight={minHeight}
      minWidth={minWidth}
    >
      {children}
    </Box>
  );
}
