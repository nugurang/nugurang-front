import type { CommonComponentProps } from '@/components/common';
import HeaderItemView from '@/components/organisms/common/header/HeaderItemView';

// Header 컴포넌트에서 사용하기 위해 export함
export interface ComponentProps extends CommonComponentProps {
  active?: boolean;
  headerItem: HeaderItemObject;
}

const HeaderItem: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <HeaderItemView {...viewProps} />
  );

}

export default HeaderItem;
