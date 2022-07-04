import React from 'react';

import {NextPageContext} from 'next';
import {ErrorProps} from 'next/error';

import {CustomErrorPage} from '../src/pages/error/main';


const ErrorPage = (props: ErrorProps) => {
  return <CustomErrorPage {...props}/>;
};

ErrorPage.getInitialProps = ({res, err}: NextPageContext) => {
  if (typeof window === 'undefined') {
    require('newrelic').noticeError(err);
  } else if ('newrelic' in window) {
    window.newrelic.noticeError(err);
  }

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {statusCode};
};

export default ErrorPage;
