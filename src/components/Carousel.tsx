'use client';
import React from 'react'
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export interface CarouselProps {
  children: React.ReactNode
}

export default function Carousel({
  children,
  ...rest
}: CarouselProps) {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {children}
    </Slider>
  )
}
