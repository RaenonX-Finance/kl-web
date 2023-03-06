import MockedSocket from 'socket.io-mock';

import * as socketUtils from '../../src/utils/socket';


export const initMockSocket = () => {
  beforeEach(() => {
    jest.spyOn(socketUtils, 'generatePxSocketClient').mockReturnValue(new MockedSocket().socketClient);
    jest.spyOn(socketUtils, 'generateAccountSocketClient').mockReturnValue(new MockedSocket().socketClient);
  });
};
