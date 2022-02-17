import type { CommonComponentProps } from '@/src/components/common';
import NavigationBarItemView from '@/src/components/organisms/common/navigationBar/NavigationBarItemView';

// NavigationBar 컴포넌트에서 사용하기 위해 export함
export interface ComponentProps extends CommonComponentProps {
  selected?: boolean;
  navigationBarItem: NavigationBarItemObject;
}

const NavigationBarItem: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <NavigationBarItemView {...viewProps} />
  );

}

export default NavigationBarItem;
