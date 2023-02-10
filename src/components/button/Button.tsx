import { MouseEventHandler, ReactNode, useContext, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { FillVariantKey, PaletteKey, Theme, ThemeContext } from '../theme';
import CircularLoader from '../progress/CircularLoader';

interface ButtonProps {
  theme: Theme;
  fillVariant?: FillVariantKey;
  fullWidth?: boolean;
  minWidth?: string;
  palette?: PaletteKey;
}
const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  ${props => (props.fullWidth ? `
    width: 100%;
  ` : '')}
  ${props => (props.fillVariant !== 'text' && props.minWidth ? `
    min-width: ${props.minWidth};
  ` : '')}
  
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
          return props.theme.palette[props.palette ?? 'default'].main;
        case 'outlined':
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
  padding: ${props => {
    switch(props.fillVariant) {
      case 'text':
        return '12px 0';
      case 'outlined':
      case 'filled':
      default:
        return '12px 24px';
    }
  }};
`;

interface ButtonIconWrapProps {
}
const ButtonIconWrap = styled.div<ButtonIconWrapProps>`
  display: flex;
  justify-content: center;
`;

interface ButtonCircularLoaderWrapProps {
  show: boolean;
  size: string;
}
const ButtonCircularLoaderWrap = styled.div<ButtonCircularLoaderWrapProps>`
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
  children: ReactNode | string;
  fullWidth?: boolean;
  fillVariant?: FillVariantKey;
  isLoading?: boolean;
  minWidth?: string;
  palette?: PaletteKey;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    children,
    fullWidth,
    fillVariant,
    isLoading,
    minWidth,
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

  useEffect(() => {
    console.log(children + ":" + isLoading)
  }, [isLoading]);
 
  return (
    <Button
      theme={theme}
      fullWidth={fullWidth}
      fillVariant={fillVariant}
      minWidth={minWidth ?? '120px'}
      palette={palette}
      onClick={onClick}
    >
      <ButtonIconWrap>
        <ButtonCircularLoaderWrap
          show={isLoading ?? false}
          size='16px'
        >
          <CircularLoader
            size='16px'
            palette={palette ?? defaultPalette}
            paletteColor={defaultPaletteColor}
          />
        </ButtonCircularLoaderWrap>
      </ButtonIconWrap>
      <span>{children}</span>
    </Button>
  );
}
