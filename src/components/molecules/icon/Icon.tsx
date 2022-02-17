import type { CommonComponentProps } from '@/src/components/common';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import IconView from '@/src/components/molecules/icon/IconView';

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
