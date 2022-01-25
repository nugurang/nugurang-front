import NavigationBar, { height as navigationBarHeight } from '@/src/components/NavigationBar';
import NavigationBarItem, { Props as NavigationBarItemProps } from '@/src/components/NavigationBarItem';

import Footer from '@/src/components/Footer';
import Head from 'next/head';
import Header from '@/src/components/Header';
import { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  footer?: boolean;
  header?: boolean;
  navigationBar?: boolean;
  navigationBarItems?: NavigationBarItemProps[];
}

interface StyledButtonWrapProps {
  navigationBar: boolean;
}

const StyledDivContainer = styled.div<StyledButtonWrapProps>`
  ${(props: any) => `
    position: relative;
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.background.text};
    min-height: ${props.navigationBar ? `calc(100% - ${navigationBarHeight})` : '100%'};
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const Container: NextPage<Props> = ({
  children,
  footer = false,
  header = false,
  navigationBar = false,
  navigationBarItems = []
}) => {
  return (
    <>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledDivContainer navigationBar={navigationBar}>
        { header && <Header /> }
        <WidthLimiter>
          { children }
        </WidthLimiter>
        { footer && <Footer /> }
      </StyledDivContainer>
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
