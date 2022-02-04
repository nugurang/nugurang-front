import NavigationBar, { height as navigationBarHeight } from '@/src/components/NavigationBar';
import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Footer from '@/src/components/Footer';
import Head from 'next/head';
import Header from '@/src/components/Header';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import NavigationBarItem from '@/src/components/NavigationBarItem';
import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

interface NavigationBarItem {
  href: string;
  icon: IconProp;
  label: string;
}

const navigationBarItems: NavigationBarItem[] = [
  {
    href: '/home',
    icon: ['fas', 'coffee'],
    label: 'home',
  },
  {
    href: '/mypage',
    icon: ['fas', 'user'],
    label: 'myPage',
  },
  {
    href: '/boards',
    icon: ['fas', 'book-reader'],
    label: 'boards',
  },
  {
    href: '/admin/sandbox',
    icon: ['fas', 'flask'],
    label: 'sandbox',
  },
  {
    href: '/admin/console',
    icon: ['fas', 'terminal'],
    label: 'console',
  },
];

interface CssProps {
  className?: string;
  isFrameActive?: boolean;
}

interface ComponentProps extends CssProps {
  callbackUrl?: string;
  children?: React.ReactNode;
  currentUser?: any;
  footer?: boolean;
  header?: boolean;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledWrap = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    height: 100%;
  `}
`;

const StyledMainDiv = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: relative;
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.background.text};
    min-height: ${props.isFrameActive ? `calc(100% - ${navigationBarHeight})` : '100%'};
    transition-duration: 0.2s;
    transition-property: background-color, color;
    ${fontFamily}
  `}
`;

const Container: NextPage<ComponentProps> = ({
  callbackUrl,
  children,
  className,
  currentUser,
}) => {
  /*
  const user = currentUser ? {
    name: currentUser.name,
    imageAddress: currentUser.image.address
  } : null;
  */
  const isFrameActive = callbackUrl && navigationBarItems.map((e: any) => e.href).find((e: string) => e == new URL(callbackUrl as string).pathname);
  return (
    <StyledWrap className={className}>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledMainDiv isFrameActive={isFrameActive}>
        { isFrameActive && <Header callbackUrl={callbackUrl} /> }
        <WidthLimiter>
          { children }
        </WidthLimiter>
        { isFrameActive && <Footer /> }
      </StyledMainDiv>
      { isFrameActive && <NavigationBar>
        {navigationBarItems.map((navigationBarItem, index) => {
          return <NavigationBarItem
            active={navigationBarItem.href == new URL(callbackUrl as string).pathname}
            href={navigationBarItem.href}
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
