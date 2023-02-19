import { ReactNode, useContext } from 'react';
import styled from '@emotion/styled';
import { Theme, ThemeContext } from '../theme';
import Box, { BoxPaddingLevel } from '../layout/Box';

interface CardProps {
  theme: Theme;
  absolutelyFullSize?: boolean;
  roundCorner?: boolean;
}
const Card = styled.div<CardProps>`
  position: relative;
  background-color: ${props => props.theme.palette.default.base};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.palette.default.low};
  border-radius: ${props => props.roundCorner ? '8px': '0'};
  overflow: hidden;
  ${props => `
    ${props.absolutelyFullSize ? `
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    ` : ''}
  `}
`;

interface Props {
  children: ReactNode | string;
  absolutelyFullSize?: boolean;
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
  roundCorner?: boolean;
}
export default (props: Props) => {
  const {
    children,
    absolutelyFullSize,
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
    roundCorner,
  } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <Card
      theme={theme}
      absolutelyFullSize={absolutelyFullSize}
      roundCorner={roundCorner ?? true}
    >
      <Box
        absolutelyFullSize={absolutelyFullSize}
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
    </Card>
  );
}
