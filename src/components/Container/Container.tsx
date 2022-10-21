import React from 'react';
import { Page, PageExtendedProps } from 'grommet';

type ContainerProps = PageExtendedProps;
const Container: React.FunctionComponent<ContainerProps> = (
  props: ContainerProps,
) => {
  return <Page kind="narrow" pad="medium" {...props} />;
};

export default Container;
