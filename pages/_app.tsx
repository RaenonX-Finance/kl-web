import React from 'react';

import {AppProps} from 'next/app';
import Head from 'next/head';
import {Provider} from 'react-alert';

import {PopupAlert} from '../src/components/alert/main';
import {Navigation} from '../src/components/nav/main';
import {MainApp} from '../src/layout/main';
import {ReduxProvider} from '../src/state/provider';

import '../styles/bootstrap.css';
import '../styles/bsIcons.css';
import '../styles/index.css';
import '../styles/scrollbar.scss';


const NextApp = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <Head>
        <title>KL-Law 看盤</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      </Head>
      <React.StrictMode>
        <ReduxProvider>
          <Provider template={PopupAlert} timeout={3000} position="bottom center">
            <Navigation/>
            <div id="body">
              <MainApp renderApp={() => <Component {...pageProps}/>}/>
            </div>
          </Provider>
        </ReduxProvider>
      </React.StrictMode>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default NextApp;
