import React from 'react';

import {NextPageContext} from 'next';
import {ErrorProps} from 'next/error';

import {CustomErrorPage} from '../src/pages/error/main';


const ErrorPage = (props: ErrorProps) => {
  return <CustomErrorPage {...props}/>;
};

ErrorPage.getInitialProps = ({res, err}: NextPageContext): ErrorProps => {
  if (typeof window === 'undefined') {
    require('newrelic').noticeError(err);
  } else if ('newrelic' in window) {
    window.newrelic.noticeError(err);
  }

  const statusCode = (res ? res.statusCode : err ? err.statusCode : 404) || 404;
  return {statusCode, title: err?.message};
};

export default ErrorPage;
