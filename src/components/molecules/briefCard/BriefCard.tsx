import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import BriefCardView from '@/src/components/molecules/briefCard/BriefCardView';

interface ComponentProps extends CommonComponentProps {
  title?: string;
  subtitle?: string;
  icon?: IconObject;
}

const BriefCard: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <BriefCardView {...viewProps} />
  );
  
}

export default BriefCard;
