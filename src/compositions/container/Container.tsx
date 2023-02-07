import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import NavigationBar, { navigationBarHeight } from './NavigationBar';
import Header from './Header';
import { useMediaQuery } from '@/components/common';
import type { GetCurrentUserResponseData } from '@/services/api/user';

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

interface ContentSpacerForNavigationBarProps {
  show?: boolean;
}
const ContentSpacerForNavigationBar = styled.div<ContentSpacerForNavigationBarProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  height: ${navigationBarHeight ?? '0'};
  width: 100%;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

interface Props {
  children: ReactNode | string;
  currentUser?: GetCurrentUserResponseData;
  centerizeHorizontally?: boolean;
  centerizeVertically?: boolean;
  showHeader?: boolean;
  wallpaperUrl?: string;
}
export default (props: Props) => {
  const {
    children,
    currentUser,
    showHeader,
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
          <Header show={showHeader ?? true} currentUser={currentUser} />
          <ContentBase>
            <NavigationBar
              show={isMobileView as boolean ?? false}
            />
            <Content>
              {children}
              <ContentSpacerForNavigationBar show={showHeader ?? true}/>
            </Content>
          </ContentBase>
        </VerticalFlex>
      </ContainerInnerBase>
    </ContainerOuterBase>
  );
}
