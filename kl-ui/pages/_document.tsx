import React from 'react';

import {isProduction} from 'kl-web-common/utils/env';
import newrelic from 'newrelic';
import Document, {DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript} from 'next/document';


type Props = {
  browserTimingHeader: string,
  isProduction: boolean,
};

/**
 * Base react app document component.
 */
class NextDocument extends Document<Props> {
  /**
   * @inheritDoc
   */
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & Props> {
    const initialProps = await Document.getInitialProps(ctx);

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    });

    return {
      ...initialProps,
      browserTimingHeader,
      isProduction: isProduction(),
    };
  }

  /**
   * @inheritDoc
   */
  render() {
    // noinspection HtmlRequiredTitleElement,JSUnresolvedLibraryURL
    return (
      <Html>
        <Head>
          <meta charSet="utf-8"/>
          <meta
            name="description"
            content="KL 看盤網"
          />
          <meta content="#1184c4" name="theme-color"/>

          <link href="/favicon.ico" rel="icon"/>
          <link href="/logo512.png" rel="apple-touch-icon"/>

          {/* New Relic Browser monitoring */}
          {this.props.isProduction ?
            <script async type="text/javascript" src="/js/newRelicBrowser.Prod.js"/> :
            <script async type="text/javascript" src="/js/newRelicBrowser.Dev.js"/>
          }
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{__html: this.props.browserTimingHeader}}
          />

          {/* NOTE: Bootstrap CSS already imported via `bootstrap.css` in `_app.tsx` */}
          {/* Bootstrap Icons */}
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default NextDocument;
