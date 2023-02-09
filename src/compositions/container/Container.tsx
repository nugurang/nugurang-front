import { ReactNode, useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Header from '../page/Header';
import { useViewportType } from '@/components/common';
import type { User } from '@/services/api/user';
import LeftSidebar from '../page/LeftSidebar';
import RightSidebar from '../page/RightSidebar';
import { Theme, ThemeContext } from '@/components/theme';

const ContainerBase = styled.div`
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
    background-image: url("${props.url}");
  `)}
`;

const VerticalFlex = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  &>*:last-child {
    flex-grow: 1;
  }
`;
const HorizontalFlex = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  &>*:last-child {
    flex-grow: 1;
  }
`;

const ContentBase = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
`;

const Content = styled.div`
  flex-shrink: 1;
  flex-basis: 768px;
  position: relative;
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SidebarWrap = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-basis: 256px;
  position: relative;
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  const viewportType = useViewportType();
  const [wallpaperImage, setWallpaperImage] = useState({
    isLoaded: false,
    url: '',
  });
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

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

  useEffect(() => {
    setShowSidebar(viewportType === 'desktop');
  }, [viewportType]);

  return (
    <ContainerBase>
      <VerticalFlex>
        <Header show={showHeader ?? true} currentUser={currentUser} />
        <ContentBase>
          {showSidebar && (
            <SidebarWrap>
              <LeftSidebar />
            </SidebarWrap>
          )}
          <WallpaperFallback theme={theme} />
          <Wallpaper
            theme={theme}
            isLoaded={wallpaperImage.isLoaded}
            src={wallpaperImage.isLoaded ? wallpaperImage.url : undefined}
          />
          <Content>
            {children}
          </Content>
          {showSidebar && (
            <SidebarWrap>
              <RightSidebar />
            </SidebarWrap>
          )}
        </ContentBase>
      </VerticalFlex>
    </ContainerBase>
  );
}
