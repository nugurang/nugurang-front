import React from 'react';
import {
  Button as _Button,
  ButtonExtendedProps as _ButtonExtendedProps,
} from 'grommet';

interface ButtonProps extends _ButtonExtendedProps {}
const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  return <_Button {...props}></_Button>;
};

export default Button;
