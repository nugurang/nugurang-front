import type { CommonComponentProps } from '@/components/common';
import HeaderView from '@/components/organisms/common/header/HeaderView';

type User = {
  name: string;
  imageUrl?: string;
}

interface ComponentProps extends CommonComponentProps {
  callbackUrl?: string;
  user?: User;
}

const Header: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <HeaderView {...viewProps} />
  );

};

export default Header;
