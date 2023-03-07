'use strict';
const {getEnvironment} = require('kl-web-common/utils/env');
/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  app_name: [`KL.Api.Px.${getEnvironment()}`],
  logging: {
    level: 'info',
  },
  allow_all_headers: true,
  application_logging: {
    forwarding: {
      enabled: true,
    },
  },
  browser_monitoring: {
    attributes: {
      enabled: true,
    },
  },
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*',
    ],
  },
};
