import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from './Card';
import Centerizer from './Centerizer';

const ContainerBase = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

interface WallpaperProps {
  isLoaded: boolean;
  url?: string;
}
const Wallpaper = styled.img<WallpaperProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
	transition-property: opacity;
	transition-duration: 1000ms;
	transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
  z-index: -1;
  ${props => (props.isLoaded ? 'opacity: 1;' : 'opacity: 0;')}
  ${props => (`
    background-image: url("${props.url}");
  `)}
`;

interface ContainerProps {
  children: ReactNode | string;
  centerizeHorizontally?: boolean;
  centerizeVertically?: boolean;
  wallpaperUrl?: string;
}
export default (props: ContainerProps) => {
  const {
    children,
    centerizeHorizontally,
    centerizeVertically,
    wallpaperUrl,
  } = props;
  const [wallpaperImage, setWallpaperImage] = useState({
    isLoaded: false,
    url: '',
  });

  useEffect(() => {
    const wallpaperImage = new Image();
    wallpaperImage.onload = () => {
      setWallpaperImage({
        isLoaded: true,
        url: wallpaperUrl ?? '',
      });
    };
    wallpaperUrl && (wallpaperImage.src = wallpaperUrl);
  }, []);

  return (
    <ContainerBase>
      <Wallpaper
        isLoaded={wallpaperImage.isLoaded}
        src={wallpaperImage.isLoaded ? wallpaperImage.url : undefined}
      />
      <Centerizer
        horizontally={centerizeHorizontally ?? true}
        vertically={centerizeVertically ?? false}
      >
        <Card>
          {children}
        </Card>
      </Centerizer>
    </ContainerBase>
  );
}
