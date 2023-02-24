import React from 'react';

import {AppProps} from 'next/app';
import Head from 'next/head';
import {SessionProvider} from 'next-auth/react';
import Container from 'react-bootstrap/Container';

import {ErrorPopup} from '../src/components/error/popup';
import {Navigation} from '../src/components/nav/main';
import {ReduxProvider} from '../src/state/provider';
import {store} from '../src/state/store';

import '../styles/bootstrap.scss';
import '../styles/index.scss';
import '../styles/scrollbar.scss';


const NextApp = ({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps) => (
  <>
    <Head>
      <title>KL-Law 看盤</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    </Head>
    <React.StrictMode>
      <ReduxProvider reduxStore={store}>
        <SessionProvider session={session}>
          <ErrorPopup/>
          <Navigation/>
          <div id="body">
            <Container fluid className="h-100 p-0 position-relative">
              <Component {...pageProps}/>
            </Container>
          </div>
        </SessionProvider>
      </ReduxProvider>
    </React.StrictMode>
  </>
);

export default NextApp;
