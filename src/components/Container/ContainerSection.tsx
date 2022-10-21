import React from 'react';
import { PageContent, PageContentExtendedProps } from 'grommet';

type ContainerSectionProps = PageContentExtendedProps;
const ContainerSection: React.FunctionComponent<ContainerSectionProps> = (
  props: ContainerSectionProps,
) => {
  return (
    <PageContent background="subbackground" pad="medium" round {...props} />
  );
};

export default ContainerSection;
