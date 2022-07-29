import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import * as React from "react";
import renderStatic from "../shared/renderer";
export default class AppDocument extends Document {
  // https://emotion.sh/docs/ssr#nextjs
  static async getInitialProps(context: DocumentContext) {
    const page = await context.renderPage();
    const { css, ids } = await renderStatic(page.html);
    const initialProps = await Document.getInitialProps(context);
    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style
            data-emotion={`css ${ids.join(" ")}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </React.Fragment>
      ),
    };
  }

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
