import React from 'react';
import { Heading as _Heading, HeadingExtendedProps } from 'grommet';

interface HeadingProps extends HeadingExtendedProps {}
const Heading: React.FunctionComponent<HeadingProps> = (
  props: HeadingProps,
) => {
  return <_Heading {...props}></_Heading>;
};

export default Heading;
