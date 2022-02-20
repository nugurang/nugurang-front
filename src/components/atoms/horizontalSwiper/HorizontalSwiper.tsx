import type { CommonComponentProps } from '@/components/common';
import HorizontalSwiperView from '@/components/atoms/horizontalSwiper/HorizontalSwiperView';

interface ComponentProps extends CommonComponentProps {}

const HorizontalSwiper: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <HorizontalSwiperView {...viewProps} />
  );

}

export default HorizontalSwiper;
