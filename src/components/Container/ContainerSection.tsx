import React from 'react';
import { PageContent, PageContentExtendedProps } from 'grommet';

interface ContainerSectionProps extends PageContentExtendedProps {}
const ContainerSection: React.FunctionComponent<ContainerSectionProps> = (
  props: ContainerSectionProps,
) => {
  return (
    <PageContent
      background="#fff"
      elevation="medium"
      pad="medium"
      round
      {...props}></PageContent>
  );
};

export default ContainerSection;
