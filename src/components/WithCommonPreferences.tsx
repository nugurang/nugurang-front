import * as constants from '@/src/constants';

import { signOut, useSession } from 'next-auth/react';

import type { CommonStyledProps } from '@/src/components/common';
import { ComponentType } from 'react';
import Div from '@/src/components/quarks/div/Div';
import Footer from '@/src/components/organisms/common/footer/Footer';
import Head from 'next/head';
import Header from '@/src/components/organisms/common/header/Header';
import HeaderItem from '@/src/components/organisms/common/header/HeaderItem';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import NavigationBar from '@/src/components/organisms/common/navigationBar/NavigationBar';
import NavigationBarItem from '@/src/components/organisms/common/navigationBar/NavigationBarItem';
import{ height as navigationBarHeight } from '@/src/components/organisms/common/navigationBar/NavigationBarView';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface WithCommonPreferencesProps {}

interface StyledComponentProps extends CommonStyledProps {
  isFrameActive?: boolean
}

const StyledWrap = styled(Div)`
  height: 100%;
`;

const StyledMainDiv = styled(Div)<StyledComponentProps>`
  ${(props: any) => `
    position: relative;
    
    background-color: ${props.theme.palette.background.main};
    min-height: ${props.isFrameActive ? `calc(100% - ${navigationBarHeight}px)` : '100%'};
    ${props.theme.screenSizeMediaQuery.gteLaptop} {
      min-height: 100%;
    }

    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledNavigationBar = styled(NavigationBar)<StyledComponentProps>`
  ${(props: any) => `
    ${props.theme.screenSizeMediaQuery.gteLaptop} {
      display: none;
    }
  `}
`;

function WithCommonPreferences<P extends object>(
  ChildComponent: ComponentType<P>
): React.FC<P & WithCommonPreferencesProps> {
  return function WithLoadingComponent({ ...props }: WithCommonPreferencesProps) {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (session) signOut(); // next-auth의 세션 정보는 불필요하므로 바로 로그아웃함

    const isFrameActive = constants.DEFAULT_TOOLBAR_SHORTCUT_ITEMS
                          .map((e: any) => e.pathname)
                          .find((e: string) => e == router.pathname);

    return <>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledWrap>
        <StyledMainDiv isFrameActive={isFrameActive}>
          {isFrameActive && <>
            <Header>
              {constants.DEFAULT_TOOLBAR_SHORTCUT_ITEMS
              .map((e: HeaderItemObject) => ({ ...e, icon: e.icon as IconObject }))
              .map((headerItem, index) => {
                return <HeaderItem
                  headerItem={headerItem}
                  active={headerItem.pathname == router.pathname}
                  key={index}
                />;
              })}
            </Header>
          </>}
          <ChildComponent {...(props as P)} />
          {isFrameActive && <Footer />}
        </StyledMainDiv>
        {isFrameActive && <>
          <StyledNavigationBar>
            {constants.DEFAULT_TOOLBAR_SHORTCUT_ITEMS
            .map((e: HeaderItemObject) => ({ ...e, icon: e.icon as IconObject }))
            .map((navigationBarItem, index) => {
              return <NavigationBarItem
                navigationBarItem={navigationBarItem}
                selected={navigationBarItem.pathname == router.pathname}
                key={index}
              />;
            })}
          </StyledNavigationBar>
        </>
        }
      </StyledWrap>
    </>;
  };
}

export default WithCommonPreferences;
