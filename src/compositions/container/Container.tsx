import { ReactNode, useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Header, { headerSpacerHeight } from '../page/Header';
import type { User } from '@/services/api/user';
import { Theme, ThemeContext } from '@/components/theme';

const ContainerOuterWrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

interface WallpaperFallbackProps {
  theme: Theme;
}
const WallpaperFallback = styled.div<WallpaperFallbackProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
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

interface HeaderWrapProps {
  theme: Theme;
  show: boolean;
}
const HeaderWrap = styled.div<HeaderWrapProps>`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${props => props.theme.zIndex.header};
`;
interface HeaderSpacerProps {
  show: boolean;
}
const HeaderSpacer = styled.div<HeaderSpacerProps>`
  display: ${props => props.show ? 'block' : 'none'};
  height: ${headerSpacerHeight};
  width: 100%;
`;

interface Props {
  children: ReactNode | string;
  currentUser?: User;
  centerizeHorizontally?: boolean;
  centerizeVertically?: boolean;
  showHeader?: boolean;
  showSidebar?: boolean;
  wallpaperUrl?: string;
}
export default (props: Props) => {
  const {
    children,
    currentUser,
    showHeader,
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
    <ContainerOuterWrap>
      <HeaderWrap theme={theme} show={showHeader ?? true}>
        <Header show={showHeader ?? true} currentUser={currentUser} />
      </HeaderWrap>
      <WallpaperFallback theme={theme} />
      <Wallpaper
        theme={theme}
        isLoaded={wallpaperImage.isLoaded}
        src={wallpaperImage.isLoaded ? wallpaperImage.url : undefined}
      />
      <HeaderSpacer show={showHeader ?? true} />
      {children}
    </ContainerOuterWrap>
  );
}
