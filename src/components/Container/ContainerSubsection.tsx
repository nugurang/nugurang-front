import React from 'react';
import { Box, BoxExtendedProps } from 'grommet';

interface ContainerSubsectionProps extends BoxExtendedProps {}
const ContainerSubsection: React.FunctionComponent<ContainerSubsectionProps> = (
  props: ContainerSubsectionProps,
) => {
  return <Box pad={{ vertical: 'small' }} {...props}></Box>;
};

export default ContainerSubsection;
