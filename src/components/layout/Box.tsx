import { ReactNode } from 'react';
import styled from '@emotion/styled';

export type BoxPaddingLevel = 0 | 1 | 2 | 3;
const BOX_PADDING_WEIGHT = 8;

interface BoxProps {
  centerizeHorizontally?: boolean;
  centerizeVertically?: boolean;
  horizontalPaddingLevel?: BoxPaddingLevel;
  verticalPaddingLevel?: BoxPaddingLevel;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  gap?: string;
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
  ${props => (props.centerizeHorizontally ? 'align-items: center;' : '')}
  ${props => (props.centerizeVertically ? 'justify-content: center;' : '')}
  ${props => (props.horizontalPaddingLevel ? `
    padding-left: ${BOX_PADDING_WEIGHT * props.horizontalPaddingLevel}px;
    padding-right: ${BOX_PADDING_WEIGHT * props.horizontalPaddingLevel}px;
  ` : '')}
  ${props => (props.verticalPaddingLevel ? `
    padding-top: ${BOX_PADDING_WEIGHT * props.verticalPaddingLevel}px;
    padding-bottom: ${BOX_PADDING_WEIGHT * props.verticalPaddingLevel}px;
  ` : '')}
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
  horizontalPaddingLevel?: BoxPaddingLevel;
  verticalPaddingLevel?: BoxPaddingLevel;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  gap?: string;
}
export default (props: Props) => {
  const {
    children,
    centerizeHorizontally,
    centerizeVertically,
    horizontalPaddingLevel,
    verticalPaddingLevel,
    height,
    width,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    gap,
  } = props;

  return (
    <Box
      centerizeHorizontally={centerizeHorizontally ?? false}
      centerizeVertically={centerizeVertically ?? false}
      horizontalPaddingLevel={horizontalPaddingLevel ?? 0}
      verticalPaddingLevel={verticalPaddingLevel ?? 0}
      height={height}
      width={width}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minHeight={minHeight}
      minWidth={minWidth}
      gap={gap}
    >
      {children}
    </Box>
  );
}
