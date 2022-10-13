import React from 'react';
import { Box as _Box, BoxExtendedProps as _BoxExtendedProps } from 'grommet';

interface BoxProps extends _BoxExtendedProps {}
const Box: React.FunctionComponent<BoxProps> = (props: BoxProps) => {
  return <_Box {...props}></_Box>;
};

export default Box;
