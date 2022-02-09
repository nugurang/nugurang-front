import GlobalStyle from '../src/styles/global';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../src/styles/theme';

export const GlobalStyleForStorybook = () => (
  <Global
    styles={GlobalStyle}
  />
);

export const decorators = [
  Story => (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyleForStorybook />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
