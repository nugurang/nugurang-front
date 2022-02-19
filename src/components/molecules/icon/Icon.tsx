import type { CommonComponentProps } from '@/components/common';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import IconView from '@/components/molecules/icon/IconView';

interface ComponentProps extends CommonComponentProps {
  type?: IconTypeKeys;
  edge?: string;
  src?:  string | IconProp;
  alt?:  string;
}

const Icon: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <IconView {...viewProps} />
  );
}

export default Icon;
