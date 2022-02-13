import * as constants from '@/src/constants';

import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';
import NavigationBar, { height as navigationBarHeight } from '@/src/components/NavigationBar';
import { signOut, useSession } from 'next-auth/react';

import { ComponentType } from 'react';
import Div from '@/src/components/quarks/div/Div';
import Footer from '@/src/components/Footer';
import Head from 'next/head';
import Header from '@/src/components/Header';
import HeaderItem from '@/src/components/HeaderItem';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import NavigationBarItem from '@/src/components/NavigationBarItem';
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

    const isFrameActive = constants.DEFAULT_NAVIGATION_BAR_ITEMS
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
              {constants.DEFAULT_NAVIGATION_BAR_ITEMS.map((navigationBarItem, index) => {
                return <HeaderItem
                  active={navigationBarItem.pathname == router.pathname}
                  pathname={navigationBarItem.pathname}
                  fontAwesomeIcon={navigationBarItem.fontAwesomeIcon as IconProp}
                  label={navigationBarItem.label}
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
            {constants.DEFAULT_NAVIGATION_BAR_ITEMS.map((navigationBarItem, index) => {
              return <NavigationBarItem
                active={navigationBarItem.pathname == router.pathname}
                pathname={navigationBarItem.pathname}
                fontAwesomeIcon={navigationBarItem.fontAwesomeIcon as IconProp}
                label={navigationBarItem.label}
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
