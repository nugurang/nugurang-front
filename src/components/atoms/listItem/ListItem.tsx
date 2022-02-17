import type { CommonComponentProps } from '@/src/components/common';
import ListItemView from '@/src/components/atoms/listItem/ListItemView';
import React from 'react';

interface ComponentProps extends CommonComponentProps {}

const ListItem: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <ListItemView {...viewProps} />
  );

};

export default ListItem;
