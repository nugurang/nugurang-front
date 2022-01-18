import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    color: {
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
      text: string,
      background: string,
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