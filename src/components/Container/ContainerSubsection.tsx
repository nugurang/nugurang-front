import React from 'react';
import { Box, BoxExtendedProps } from 'grommet';

type ContainerSubsectionProps = BoxExtendedProps;
const ContainerSubsection: React.FunctionComponent<ContainerSubsectionProps> = (
  props: ContainerSubsectionProps,
) => {
  return <Box pad={{ vertical: 'small' }} {...props} />;
};

export default ContainerSubsection;
