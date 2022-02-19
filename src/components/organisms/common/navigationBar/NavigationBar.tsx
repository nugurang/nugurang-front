import type { CommonComponentProps } from '@/components/common';
import NavigationBarView from '@/components/organisms/common/navigationBar/NavigationBarView';

interface ComponentProps extends CommonComponentProps {}

const NavigationBar: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <NavigationBarView {...viewProps} />
  );
  
}

export default NavigationBar;
