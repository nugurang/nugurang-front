import React from 'react';
import {
  Button as OriginalButton,
  ButtonExtendedProps as _ButtonExtendedProps,
} from 'grommet';

type ButtonProps = _ButtonExtendedProps;
const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  return <OriginalButton {...props} />;
};

export default Button;
