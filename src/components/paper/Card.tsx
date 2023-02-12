import { ReactNode, useContext } from 'react';
import styled from '@emotion/styled';
import { Theme, ThemeContext } from '../theme';
import Box, { BoxPaddingLevel } from '../layout/Box';

interface CardProps {
  theme: Theme;
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

  roundCorner?: boolean;
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

    roundCorner,
  } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <Card
    theme={theme}
    roundCorner={roundCorner ?? true}
    >
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
    </Card>
  );
}
