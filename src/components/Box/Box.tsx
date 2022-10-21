import React from 'react';
import {
  Box as OriginalBox,
  BoxExtendedProps as OriginalBoxExtendedProps,
} from 'grommet';

type BoxProps = OriginalBoxExtendedProps;
const Box: React.FunctionComponent<BoxProps> = (props: BoxProps) => {
  return <OriginalBox {...props} />;
};

export default Box;
