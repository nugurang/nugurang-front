import * as constants from '@/src/constants';

import NavigationBar, { height as navigationBarHeight } from '@/src/components/NavigationBar';
import { signOut, useSession } from 'next-auth/react';

import type { CommonProps } from '@/src/components/base/common';
import { ComponentType } from 'react';
import Div from '@/src/components/base/Div';
import Footer from '@/src/components/Footer';
import Head from 'next/head';
import Header from '@/src/components/Header';
import NavigationBarItem from '@/src/components/NavigationBarItem';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface WithCommonPreferencesProps {}

interface StyledProps extends CommonProps {
  isFrameActive?: boolean
}

const StyledWrap = styled(Div)`
  height: 100%;
`;

const StyledMainDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    position: relative;
    
    background-color: ${props.theme.palette.background.main};
    min-height: ${props.isFrameActive ? `calc(100% - ${navigationBarHeight}px)` : '100%'};

    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

function WithCommonPreferences<P extends object>(
  ChildComponent: ComponentType<P>
): NextPage<P & WithCommonPreferencesProps> {
  return function WihLoadingComponent({ ...props }: WithCommonPreferencesProps) {
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
          {isFrameActive && <Header />}
          <ChildComponent {...(props as P)} />
          {isFrameActive && <Footer />}
        </StyledMainDiv>
        {isFrameActive && <NavigationBar>
          {constants.DEFAULT_NAVIGATION_BAR_ITEMS.map((navigationBarItem, index) => {
            return <NavigationBarItem
              active={navigationBarItem.pathname == router.pathname}
              pathname={navigationBarItem.pathname}
              fontAwesomeIcon={navigationBarItem.fontAwesomeIcon}
              label={navigationBarItem.label}
              key={index}
            />;
          })}
          </NavigationBar>
        }
      </StyledWrap>
    </>;
  };
}

export default WithCommonPreferences;
