import React from 'react';

import {SessionProvider} from 'next-auth/react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';

import {Navigation} from '../src/components/nav/main';
import {ReduxProvider} from '../src/state/provider';

import '../styles/bootstrap.css';
import '../styles/index.css';
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
      <ReduxProvider>
        <SessionProvider session={session}>
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
