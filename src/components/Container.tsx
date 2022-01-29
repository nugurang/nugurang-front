import NavigationBar, { height as navigationBarHeight } from '@/src/components/NavigationBar';
import NavigationBarItem, { ComponentProps as NavigationBarItemProps } from '@/src/components/NavigationBarItem';
import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Footer from '@/src/components/Footer';
import Head from 'next/head';
import Header from '@/src/components/Header';
import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';

interface CssProps {
  navigationBar?: boolean;
  navigationBarItems?: NavigationBarItemProps[];
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  currentOAuth2User?: Object;
  footer?: boolean;
  header?: boolean;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledDivWrap = styled.div<StyledWrapProps>`
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
  currentOAuth2User,
  footer = false,
  header = false,
  navigationBar = false,
  navigationBarItems = []
}) => {
  /*
  const user = currentOAuth2User ? {
    name: currentOAuth2User.name,
    imageUrl: currentOAuth2User.imageUrl
  } : null;
  */
  return (
    <>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledDivWrap navigationBar={navigationBar}>
        { header && <Header /> }
        <WidthLimiter>
          { children }
        </WidthLimiter>
        { footer && <Footer /> }
      </StyledDivWrap>
      { navigationBar && <NavigationBar>
        {navigationBarItems.map((navigationBarItem, index) => {
          return <NavigationBarItem
            active={navigationBarItem.active}
            href={navigationBarItem.href}
            icon={navigationBarItem.icon}
            label={navigationBarItem.label}
            key={index}
          />;
        })}
      </NavigationBar> }
    </>
  );
}

export default Container;
