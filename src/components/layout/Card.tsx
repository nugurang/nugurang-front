import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface CardProps {
  fullSize?: boolean;
  roundCorner?: boolean;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
}
const Card = styled.div<CardProps>`
  background-color: #fff;
  border-radius: ${props => props.roundCorner ? '8px': '0'};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  overflow: hidden;
  ${props => (props.height ? `height: ${props.height};` : '')}
  ${props => (props.width ? `width: ${props.width};` : '')}
  ${props => (props.maxHeight ? `max-height: ${props.maxHeight};` : '')}
  ${props => (props.maxWidth ? `max-width: ${props.maxWidth};` : '')}
  ${props => (props.minHeight ? `min-height: ${props.minHeight};` : '')}
  ${props => (props.minWidth ? `min-width: ${props.minWidth};` : '')}
`;

interface Props {
  children: ReactNode | string;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  fullSize?: boolean;
  roundCorner?: boolean;
}
export default (props: Props) => {
  const {
    children,
    fullSize,
    roundCorner,
    height,
    width,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
  } = props;

  return (
    <Card
      fullSize={fullSize ?? false}
      roundCorner={roundCorner ?? true}
      height={height}
      width={width}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minHeight={minHeight}
      minWidth={minWidth}
    >
      {children}
    </Card>
  );
}
