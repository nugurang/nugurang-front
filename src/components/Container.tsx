import type { CommonProps, ThemeObject } from '@/src/components/base/common';
import NavigationBar, { height as navigationBarHeight } from '@/src/components/NavigationBar';

import Div from '@/src/components/base/Div';
import Footer from '@/src/components/Footer';
import Head from 'next/head';
import Header from '@/src/components/Header';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import NavigationBarItem from '@/src/components/NavigationBarItem';
import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';

interface NavigationBarItem {
  pathname: string;
  icon: IconProp;
  label: string;
}

const navigationBarItems: NavigationBarItem[] = [
  {
    pathname: '/home',
    icon: ['fas', 'coffee'],
    label: 'home',
  },
  {
    pathname: '/boards',
    icon: ['fas', 'book-reader'],
    label: 'boards',
  },
  {
    pathname: '/mypage',
    icon: ['fas', 'user'],
    label: 'myPage',
  },
  {
    pathname: '/admin/sandbox',
    icon: ['fas', 'flask'],
    label: 'sandbox',
  },
  {
    pathname: '/admin/console',
    icon: ['fas', 'terminal'],
    label: 'console',
  },
];

interface ComponentProps extends CommonProps {
  callbackUrl?: string;
  currentUser?: any;
  footer?: boolean;
  header?: boolean;
}

interface StyledProps extends CommonProps {
  isFrameActive?: boolean;
}

const StyledWrap = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    height: 100%;
  `}
`;

const StyledMainDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    position: relative;
    
    background-color: ${props.theme.palette.background.main};
    min-height: ${props.isFrameActive ? `calc(100% - ${navigationBarHeight})` : '100%'};

    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const Container: NextPage<ComponentProps> = props => {
  /*
  const user = props.currentUser ? {
    name: props.currentUser.name,
    imageAddress: props.currentUser.image.address
  } : null;
  */
  const isFrameActive = props.callbackUrl && navigationBarItems
                        .map((e: any) => e.pathname)
                        .find((e: string) => e == new URL(props.callbackUrl as string).pathname);
  return (
    <StyledWrap className={props.className}>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledMainDiv isFrameActive={isFrameActive}>
        { isFrameActive && <Header callbackUrl={props.callbackUrl} /> }
        <WidthLimiter>
          { props.children }
        </WidthLimiter>
        { isFrameActive && <Footer /> }
      </StyledMainDiv>
      { isFrameActive && <NavigationBar>
        {navigationBarItems.map((navigationBarItem, index) => {
          return <NavigationBarItem
            active={navigationBarItem.pathname == new URL(props.callbackUrl as string).pathname}
            pathname={navigationBarItem.pathname}
            icon={navigationBarItem.icon}
            label={navigationBarItem.label}
            key={index}
          />;
        })}
      </NavigationBar> }
    </StyledWrap>
  );
}

export default Container;
