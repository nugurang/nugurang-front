import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface SizeFixerProps {
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
}
const SizeFixer = styled.div<SizeFixerProps>`
  position: relative;
  ${props => (props.height ? `height: ${props.height};` : '')}
  ${props => (props.width ? `width: ${props.width};` : '')}
  ${props => (props.maxHeight ? `max-height: ${props.maxHeight};` : '')}
  ${props => (props.maxWidth ? `max-width: ${props.maxWidth};` : '')}
  ${props => (props.minHeight ? `min-height: ${props.minHeight};` : '')}
  ${props => (props.minWidth ? `min-width: ${props.minWidth};` : '')}
`;

interface ContainerProps {
  children: ReactNode | string;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
}
export default (props: ContainerProps) => {
  const {
    children,
    height,
    width,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
  } = props;

  return (
    <SizeFixer
    height={height}
    width={width}
    maxHeight={maxHeight}
    maxWidth={maxWidth}
    minHeight={minHeight}
    minWidth={minWidth}
    >
      {children}
    </SizeFixer>
  );
}
