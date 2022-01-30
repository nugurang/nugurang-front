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
import styled from 'styled-components';

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
];

interface CssProps {
  className?: string;
  navigationBar?: boolean;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  currentOAuth2User?: Object;
  footer?: boolean;
  header?: boolean;
  pathname?: string;
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
    min-height: ${props.navigationBar ? `calc(100% - ${navigationBarHeight})` : '100%'};
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const Container: NextPage<ComponentProps> = ({
  children,
  className,
  currentOAuth2User,
  footer = false,
  header = false,
  pathname,
  navigationBar = false,
}) => {
  /*
  const user = currentOAuth2User ? {
    name: currentOAuth2User.name,
    imageUrl: currentOAuth2User.imageUrl
  } : null;
  */
  return (
    <StyledWrap className={className}>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledMainDiv navigationBar={navigationBar}>
        { header && <Header /> }
        <WidthLimiter>
          { children }
        </WidthLimiter>
        { footer && <Footer /> }
      </StyledMainDiv>
      { navigationBar && <NavigationBar>
        {navigationBarItems.map((navigationBarItem, index) => {
          return <NavigationBarItem
            active={navigationBarItem.href == pathname}
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
