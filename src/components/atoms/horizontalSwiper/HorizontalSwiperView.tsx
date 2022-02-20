import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import type { CommonComponentProps } from '@/components/common';
import React from 'react';

interface ViewProps extends CommonComponentProps {}

const HorizontalSwiperView: React.FC<ViewProps> = props => {
  return (
    <Swiper {...props} >
      {React.Children.map(props.children, child => 
        <SwiperSlide {...props}>
          {child}
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default HorizontalSwiperView;
