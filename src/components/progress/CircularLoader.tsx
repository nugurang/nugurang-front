import { MouseEventHandler, useContext } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react'
import { PaletteColorKey, PaletteKey, Theme, ThemeContext } from '../theme';

const circularLoaderWrapKeyframes = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
interface CircularLoaderWrapProps {
  theme: Theme;
  show: boolean;
  size: string;
}
const CircularLoaderWrap = styled.span<CircularLoaderWrapProps>`
  display: block;
  position: relative;
	height: ${props => props.size};
	width: ${props => props.size};
	animation: ${circularLoaderWrapKeyframes} 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
`;

interface CircularLoaderElementProps {
  theme: Theme;
  palette: PaletteKey;
  paletteColor: PaletteColorKey;
  size?: string;
  rotation?: string;
}
const createCircularLoaderElementKeyframes = (props: CircularLoaderElementProps) => keyframes`
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(0, calc(${props.size} / 5 * 4), 0) scale(.75); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;
const CircularLoaderElement = styled.span<CircularLoaderElementProps>`
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  transform: rotate(${props => props.rotation ?? '0deg'});
  &::after {
    content:'';
    display: block;
    margin: auto;
    height: calc(${props => props.size} / 5);
    width: calc(${props => props.size} / 5);
    background-color: ${props => props.theme.palette[props.palette][props.paletteColor]};
    border-radius: 50%;
    animation: ${props => createCircularLoaderElementKeyframes(props)} 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  }
`;

interface Props {
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
  show?: boolean;
  size?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    palette,
    paletteColor,
    show,
    size
  } = props;
  const { theme } = useContext(ThemeContext);
  const defaultPalette = 'primary';
  const defaultPaletteColor = 'main';
  const defaultSize = '24px';

  return (
    <CircularLoaderWrap theme={theme} show={show ?? true} size={size ?? defaultSize}>
      {Array.from(Array(6).keys()).map((_, index) => (
        <CircularLoaderElement
          key={index}
          theme={theme}
          palette={palette ?? defaultPalette}
          paletteColor={paletteColor ?? defaultPaletteColor}
          rotation={`${index * 60}deg`}
          size={size ?? defaultSize}
        />
      ))}
    </CircularLoaderWrap>
  );
}
