import React from 'react';
import { Page, PageExtendedProps } from 'grommet';

interface ContainerProps extends PageExtendedProps {}
const Container: React.FunctionComponent<ContainerProps> = (
  props: ContainerProps,
) => {
  return <Page kind="narrow" {...props}></Page>;
};

export default Container;
