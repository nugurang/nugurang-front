import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    palette: {
      default: {
        main: string
        light: string
        dark: string
        text: string
        smallText: string
      },
      primary: {
        main: string
        light: string
        dark: string
        text: string
        smallText: string
      },
      secondary: {
        main: string
        light: string
        dark: string
        text: string
        smallText: string
      },
      success: {
        main: string
        light: string
        dark: string
        text: string
        smallText: string
      },
      info: {
        main: string
        light: string
        dark: string
        text: string
        smallText: string
      },
      warning: {
        main: string
        light: string
        dark: string
        text: string
        smallText: string
      },
      danger: {
        main: string
        light: string
        dark: string
        text: string
        smallText: string
      },
      background: {
        main: string
        light: string
        dark: string
        sub: string
        text: string
        smallText: string
      },
      constant: {
        white: string
        black: string
      },
    },
    mediaQuery: {
      gtWatch: string
      gtMobile: string
      gtTablet: string
      gtLaptop: string
      gtDesktop: string
  
      isWatch: string
      isMobile: string
      isTablet: string
      isLaptop: string
      isDesktop: string
    }
  }
}
