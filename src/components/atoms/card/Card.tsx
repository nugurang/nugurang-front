import CardView from '@/src/components/atoms/card/CardView';
import type { CommonComponentProps } from '@/src/components/common';

interface ComponentProps extends CommonComponentProps {}

const Card: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <CardView {...viewProps}/>
  );
  
}

export default Card;
