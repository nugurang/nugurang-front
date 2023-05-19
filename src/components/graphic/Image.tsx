import NextJsImage from 'next/image';
import { FALLBACK_IMAGE_URL } from '@/constants/common';
import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import CircularLoader from '../progress/CircularLoader';

interface ImageWrapProps {
  height?: string;
  width?: string;
  isLoaded: boolean;
  absolutelytFullSize?: boolean;
}
const ImageWrap = styled.div<ImageWrapProps>`
  position: relative;
  ${props => (props.height ? `height: ${props.height};` : '')}
  ${props => (props.width ? `width: ${props.width};` : '')}
  ${props => (props.absolutelytFullSize ? `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  ` : '')}
`;

interface ImageProps {
  isLoaded: boolean;
}
const Image = styled(NextJsImage)<ImageProps>`
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  object-fit: cover;
  opacity: ${props => (props.isLoaded ? '1' : '0')};
  transition-property: opacity;
  transition-duration: 500ms;
`;

interface CircularLoaderWrapProps {
  isLoaded: boolean;
}
const CircularLoaderWrap = styled.div<CircularLoaderWrapProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: ${props => (props.isLoaded ? '0' : '1')};
  transition-property: opacity;
  transition-duration: 500ms;
`;

interface Props {
  src: string;
  alt: string;
  height?: string;
  width?: string;
  absolutelytFullSize?: boolean;
}
export default (props: Props) => {
  const {
    src,
    alt,
    height,
    width,
    absolutelytFullSize,
  } = props;
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [fallback, setFallback] = useState<boolean>(false);

  let waitImageLoaded: NodeJS.Timeout | undefined = undefined;
  const handleImageLoaded = useCallback(() => {
    waitImageLoaded && clearTimeout(waitImageLoaded);
    waitImageLoaded = undefined;
    setLoaded(true);
  }, [waitImageLoaded]);
  
  useEffect(() => {
    if (imageRef.current?.complete) {
      waitImageLoaded && clearTimeout(waitImageLoaded);
      waitImageLoaded = undefined;
      setLoaded(true);
    } else if(!imageRef.current?.complete && !waitImageLoaded) {
      waitImageLoaded = setTimeout(() => {
        if(!imageRef.current?.complete) setFallback(true)
      }, 5000);
    }
  }, [imageRef.current?.complete]);

  return (
    <ImageWrap
      height={height}
      width={width}
      isLoaded={isLoaded}
      absolutelytFullSize={absolutelytFullSize}
    >
      <Image
        ref={imageRef}
        src={fallback ? FALLBACK_IMAGE_URL : src}
        alt={alt}
        fill={true}
        isLoaded={isLoaded}
        onLoad={handleImageLoaded}
      />
      <CircularLoaderWrap isLoaded={isLoaded}>
        <CircularLoader size='48px'/>
      </CircularLoaderWrap>
    </ImageWrap>
  );
}
