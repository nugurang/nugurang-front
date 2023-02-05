import { ReactNode, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import NavigationBar from './NavigationBar';
import StatusBar from './StatusBar';

const useMediaQuery = (mediaQueryString: string) => {
  const [isMatched, setMatched] = useState<boolean>(false);
  const updateTarget = useCallback((event: MediaQueryListEvent) => {
    if (event.matches) {
      setMatched(true);
    } else {
      setMatched(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(mediaQueryString);
      media.addEventListener('change', updateTarget);
      if (media.matches) {
        setMatched(true);
      }
      return () => {
        media.removeEventListener('change', updateTarget);
      };
    }
  }, []);
  return [isMatched, setMatched];
};

const ContainerOuterBase = styled.div`
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
const ContainerInnerBase = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
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
  position: relative;
`;

interface ContentProps {
  isMobileView: boolean;
}
const Content = styled.div<ContentProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.isMobileView ? '0' : '64px'};
  right: ${props => props.isMobileView ? '0' : '64px'};
  overflow: scroll;
`;

interface Props {
  children: ReactNode | string;
  centerizeHorizontally?: boolean;
  centerizeVertically?: boolean;
  showNavigationBar?: boolean;
  showStatusBar?: boolean;
  wallpaperUrl?: string;
}
export default (props: Props) => {
  const {
    children,
    showNavigationBar,
    showStatusBar,
    wallpaperUrl,
  } = props;
  const [wallpaperImage, setWallpaperImage] = useState({
    isLoaded: false,
    url: '',
  });
  const [isMobileView] = useMediaQuery('(max-width: 720px)');

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
      <Wallpaper
        isLoaded={wallpaperImage.isLoaded}
        src={wallpaperImage.isLoaded ? wallpaperImage.url : undefined}
      />
      <ContainerInnerBase>
        <VerticalFlex>
          <StatusBar show={showStatusBar ?? true}/>
          <ContentBase>
            <NavigationBar
              isMobileView={isMobileView as boolean ?? true}
              show={showNavigationBar ?? true}
            />
            <Content
              isMobileView={isMobileView as boolean ?? true}
            >
              {children}
            </Content>
          </ContentBase>
        </VerticalFlex>
      </ContainerInnerBase>
    </ContainerOuterBase>
  );
}
