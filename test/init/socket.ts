import MockedSocket from 'socket.io-mock';

import * as socketUtils from '../../src/utils/socket';


export const initMockSocket = () => {
  beforeEach(() => {
    jest.spyOn(socketUtils, 'generateSocketClient').mockReturnValue(new MockedSocket().socketClient);
  });
};
