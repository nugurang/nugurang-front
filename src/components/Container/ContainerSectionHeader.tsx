import React from 'react';
import { PageHeader, PageHeaderExtendedProps } from 'grommet';

type ContainerSectionHeaderProps = PageHeaderExtendedProps;
const ContainerSectionHeader: React.FunctionComponent<
  ContainerSectionHeaderProps
> = (props: ContainerSectionHeaderProps) => {
  return <PageHeader responsive size="small" {...props} />;
};

export default ContainerSectionHeader;
