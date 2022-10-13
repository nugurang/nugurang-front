import React from 'react';
import { PageHeader, PageHeaderExtendedProps } from 'grommet';

interface ContainerSectionHeaderProps extends PageHeaderExtendedProps {}
const ContainerSectionHeader: React.FunctionComponent<
  ContainerSectionHeaderProps
> = (props: ContainerSectionHeaderProps) => {
  return <PageHeader responsive size="small" {...props}></PageHeader>;
};

export default ContainerSectionHeader;
