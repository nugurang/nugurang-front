import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);

  * {
    font-family: 'Nanum Gothic', sans-serif;
    margin: 0;
    padding: 0;
  }

  body {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
