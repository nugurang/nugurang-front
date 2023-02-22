import { MouseEventHandler, ReactNode, useContext, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { FillVariantKey, PaletteKey, Theme, ThemeContext } from '../theme';
import CircularLoader from '../progress/CircularLoader';
import Icon, { IconSourceType } from '../graphic/Icon';

interface IconButtonProps {
  theme: Theme;
  fillVariant?: FillVariantKey;
  size?: string;
  palette?: PaletteKey;
  setPadding?: boolean;
}
const IconButton = styled.button<IconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => `
    font-size: ${props.size};
    height: ${props.size};
    width: ${props.size};
  `}
  
  cursor: pointer;
  text-align: center;

  color: ${props => {
    switch(props.fillVariant) {
      case 'outlined':
      case 'text':
        return props.theme.palette[props.palette ?? 'default'].text;
      case 'filled':
      default:
        return props.theme.palette[props.palette ?? 'default'].contrastText;
    }
  }};
  background-color: ${props => {
    switch(props.fillVariant) {
      case 'outlined':
      case 'text':
        return 'transparent';
      case 'filled':
      default:
        return props.theme.palette[props.palette ?? 'default'].main;
    }
  }};
  border: ${props => {
    switch(props.fillVariant) {
      case 'text':
        return '2px solid transparent';
      case 'outlined':
      case 'filled':
      default:
        return `2px solid ${props.theme.palette[props.palette ?? 'default'].main}`;
    }
  }};
  &:hover {
    color: ${props => {
      switch(props.fillVariant) {
        case 'text':
        case 'outlined':
          return props.theme.palette[props.palette ?? 'default'].main;
        case 'filled':
        default:
          return props.theme.palette[props.palette ?? 'default'].contrastText;
      }
    }};
    background-color: ${props => {
      switch(props.fillVariant) {
        case 'outlined':
        case 'text':
          return 'transparent';
        case 'filled':
        default:
          return props.theme.palette[props.palette ?? 'default'].high;
      }
    }};
    border: ${props => {
      switch(props.fillVariant) {
        case 'text':
          return '2px solid transparent';
        case 'outlined':
        case 'filled':
        default:
          return `2px solid ${props.theme.palette[props.palette ?? 'default'].high}`;
      }
    }};
  }
  padding: 8px;
`;

interface IconButtonCircularLoaderWrapProps {
  show: boolean;
  size: string;
}
const IconButtonCircularLoaderWrap = styled.div<IconButtonCircularLoaderWrapProps>`
  height: ${props => props.size};
  width: ${props => props.size};
  margin-right: 8px;
  opacity: 1;
  ${props => !props.show ? `
    width: 1px;
    margin: -1px;
    opacity: 0;
  ` : ''}
  overflow: hidden;
  transition: all 500ms;
`;

interface Props {
  type?: IconSourceType;
  keyword: string;
  fillVariant?: FillVariantKey;
  isLoading?: boolean;
  size?: string;
  palette?: PaletteKey;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    type,
    keyword,
    fillVariant,
    isLoading,
    size,
    palette,
    onClick
  } = props;
  const { theme } = useContext(ThemeContext);
  const defaultPalette = 'default';
  const defaultPaletteColor = useMemo(() => {
    switch(fillVariant) {
      case 'outlined':
      case 'text':
        return 'text';
      case 'filled':
      default:
        return 'contrastText';
    }
  }, [fillVariant]);
 
  return (
    <IconButton
      theme={theme}
      fillVariant={fillVariant}
      size={size ?? '48px'}
      palette={palette}
      onClick={onClick}
    >
        <IconButtonCircularLoaderWrap
          show={isLoading ?? false}
          size={size ?? '48px'}
        >
          <CircularLoader
            size={size ?? '48px'}
            palette={palette ?? defaultPalette}
            paletteColor={defaultPaletteColor}
          />
        </IconButtonCircularLoaderWrap>
        <Icon type={type} keyword={keyword} size={`calc(${size ?? '48px'} * 0.4)`} />
    </IconButton>
  );
}
