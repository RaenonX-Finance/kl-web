// `jest-dom` extensions (for example, `expect` extension)
import '@testing-library/jest-dom';

import {TextDecoder, TextEncoder} from 'util';

import {configure} from '@testing-library/react';
import * as dotenv from 'dotenv';
import {isCi} from 'kl-web-common/utils/env';


dotenv.config();


import {initMockBrowserApis} from './init/browser';
import {initMockConsoleBehavior} from './init/console';
import {initMockSocket} from './init/socket';
import {initMockWindowMethods} from './init/window';

// Retry failing test at most 3 times if in CI
if (isCi()) {
  jest.retryTimes(3);
}

// Set findBy* and waitFor, etc. to 5 secs timeout
configure({asyncUtilTimeout: 5000});

initMockWindowMethods();
initMockConsoleBehavior();
initMockSocket();
initMockBrowserApis();

// Polyfill for `import {ObjectId} from 'mongodb';` to work
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;
