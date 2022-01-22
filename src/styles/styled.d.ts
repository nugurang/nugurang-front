import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    palette: {
      default: {
        main: string
        light: string
        dark: string
      },
      primary: {
        main: string
        light: string
        dark: string
      },
      secondary: {
        main: string
        light: string
        dark: string
      },
      success: {
        main: string
        light: string
        dark: string
      },
      info: {
        main: string
        light: string
        dark: string
      },
      warning: {
        main: string
        light: string
        dark: string
      },
      danger: {
        main: string
        light: string
        dark: string
      },
      text: {
        main: string
        sub: string
      },
      background: {
        main: string
        sub: string
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
