import { MouseEventHandler, ReactNode, useContext } from 'react';
import styled from '@emotion/styled';
import { FillVariantKey, PaletteKey, Theme, ThemeContext } from '../theme';

interface ButtonProps {
  theme: Theme;
  fillVariant?: FillVariantKey;
  fullWidth?: boolean;
  palette?: PaletteKey;
}
const Button = styled.button<ButtonProps>`
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
        return '1px solid transparent';
      case 'outlined':
      case 'filled':
      default:
        return `1px solid ${props.theme.palette[props.palette ?? 'default'].main}`;
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
          return '1px solid transparent';
        case 'outlined':
        case 'filled':
        default:
          return `1px solid ${props.theme.palette[props.palette ?? 'default'].high}`;
      }
    }};
  }
  padding: ${props => {
    switch(props.fillVariant) {
      case 'text':
        return '12px';
      case 'outlined':
      case 'filled':
      default:
        return '12px 24px';
    }
  }};
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  ${props => (props.fullWidth ? `
    display: block;
    width: 100%;
  ` : '')}
`;

interface Props {
  children: ReactNode | string;
  fullWidth?: boolean;
  fillVariant?: FillVariantKey;
  palette?: PaletteKey;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    children,
    fullWidth,
    fillVariant,
    palette,
    onClick
  } = props;
  const { theme } = useContext(ThemeContext);
 
  return (
    <Button
      theme={theme}
      fullWidth={fullWidth}
      fillVariant={fillVariant}
      palette={palette}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
