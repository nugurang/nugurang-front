import { ReactNode, useContext } from 'react';
import styled from '@emotion/styled';
import { Theme, ThemeContext } from '../theme';

interface CardProps {
  theme: Theme;
  fullSize?: boolean;
  roundCorner?: boolean;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  setMargin?: boolean;
}
const Card = styled.div<CardProps>`
  position: relative;
  background-color: ${props => props.theme.palette.default.base};
  border-radius: ${props => props.roundCorner ? '8px': '0'};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  overflow: hidden;
  ${props => (props.height ? `height: ${props.height};` : '')}
  ${props => (props.width ? `width: ${props.width};` : '')}
  ${props => (props.maxHeight ? `max-height: ${props.maxHeight};` : '')}
  ${props => (props.maxWidth ? `max-width: ${props.maxWidth};` : '')}
  ${props => (props.minHeight ? `min-height: ${props.minHeight};` : '')}
  ${props => (props.minWidth ? `min-width: ${props.minWidth};` : '')}
  ${props => (props.setMargin ? 'margin: 8px;' : '')}
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
  setMargin?: boolean;
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
    setMargin,
  } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <Card
      theme={theme}
      fullSize={fullSize ?? false}
      roundCorner={roundCorner ?? true}
      height={height}
      width={width}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minHeight={minHeight}
      minWidth={minWidth}
      setMargin={setMargin ?? true}
    >
      {children}
    </Card>
  );
}
