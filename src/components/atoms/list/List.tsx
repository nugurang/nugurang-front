import type { CommonComponentProps } from '@/components/common';
import ListView from '@/components/atoms/list/ListView';

interface ComponentProps extends CommonComponentProps {
  ordered?: boolean;
}

const List: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <ListView {...viewProps} />
  );

}

export default List;
