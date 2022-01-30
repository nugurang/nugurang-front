import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RootDocument;
