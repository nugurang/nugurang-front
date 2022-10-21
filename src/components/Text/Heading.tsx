import React from 'react';
import { Heading as OriginalHeading, HeadingExtendedProps } from 'grommet';

type HeadingProps = HeadingExtendedProps;
const Heading: React.FunctionComponent<HeadingProps> = (
  props: HeadingProps,
) => {
  return <OriginalHeading {...props} />;
};

export default Heading;
