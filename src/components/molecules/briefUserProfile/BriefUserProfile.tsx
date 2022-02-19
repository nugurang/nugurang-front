import type { CommonComponentProps, CommonStyledProps } from '@/components/common';

import BriefUserProfileView from '@/components/molecules/briefUserProfile/BriefUserProfileView';

interface ComponentProps extends CommonComponentProps {
  name: string;
  email: string;
  imageUrl?: string;
}

const BriefUserProfile: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <BriefUserProfileView {...viewProps}/>
  );
  
}

export default BriefUserProfile;
