import { ReactNode, useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from '@/components/layout/Card';
import { Theme, ThemeContext } from '@/components/theme';

const ContainerOuterBase = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

interface WallpaperFallbackProps {
  theme: Theme;
}
const WallpaperFallback = styled.div<WallpaperFallbackProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
  ${props => (`
    background-color: ${props.theme.palette.default.background};
  `)}
`;

interface WallpaperProps {
  theme: Theme;
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
    background-color: ${props.theme.palette.default.high};
    background-image: url("${props.url}");
  `)}
`;
const ContainerInnerBase = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children: ReactNode | string;
  wallpaperUrl?: string;
}
export default (props: Props) => {
  const {
    children,
    wallpaperUrl,
  } = props;
  const { theme } = useContext(ThemeContext);
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
    <ContainerOuterBase>
      <WallpaperFallback theme={theme} />
      <Wallpaper
        theme={theme}
        isLoaded={wallpaperImage.isLoaded}
        src={wallpaperImage.isLoaded ? wallpaperImage.url : undefined}
      />
      <ContainerInnerBase>
        <Card>
          {children}
        </Card>
      </ContainerInnerBase>
    </ContainerOuterBase>
  );
}
