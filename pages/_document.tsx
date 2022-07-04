import React from 'react';

import Document, {Head, Html, Main, NextScript} from 'next/document';


type Props = {};

/**
 * Base react app document component.
 */
class NextDocument extends Document<Props> {
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

          {/*
          manifest.json provides metadata used when your web app is installed on a user's mobile device or desktop.
          See https://developers.google.com/web/fundamentals/web-app-manifest/
          */}
          <link href="/manifest.json" rel="manifest"/>

          {/* React-bootstrap imports */}
          {/* No known available async ways to import these yet */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            crossOrigin="anonymous"
            src="https://unpkg.com/react/umd/react.production.min.js"
          />
          {/* No known available async ways to import these yet */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          />
          {/* No known available async ways to import these yet */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          />

          {/* New Relic Browser monitoring */}
          <script async type="text/javascript" src="/js/newRelicBrowser.js"/>

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
