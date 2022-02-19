import type { CommonComponentProps } from '@/components/common';
import LoaderView from '@/components/atoms/loader/LoaderView';

interface ComponentProps extends CommonComponentProps {}

const Loader: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <LoaderView {...viewProps} />
  );

}

export default Loader;
