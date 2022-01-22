import { ThemeProvider } from 'styled-components';
import darkTheme from '../src/styles/darkTheme';
import lightTheme from '../src/styles/lightTheme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
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
}