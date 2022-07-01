import React from 'react';

import {SocketContext} from '../../types/socket/socket';


type UsePingSocketOptions = {
  count: number,
};

type UsePingSocketReturn = {
  completed: boolean,
  start: () => void,
  clear: () => void,
  pingMs: number[],
  setInUse: (inUse: boolean) => void,
};

export const usePingSocket = ({count}: UsePingSocketOptions): UsePingSocketReturn => {
  const socket = React.useContext(SocketContext);
  const [inUse, setInUse] = React.useState(false);
  const pingCountLeft = React.useRef(0);
  const pingStart = React.useRef(0);
  const pingDuration = React.useRef<number[]>([]);

  if (!socket) {
    return {
      completed: false,
      start: () => console.error('Socket unavailable for testing ping (start)'),
      clear: () => console.error('Socket unavailable for testing ping (clear)'),
      setInUse: () => console.error('Socket unavailable for testing ping (setInUse)'),
      pingMs: [],
    };
  }

  const onPong = () => {
    pingCountLeft.current -= 1;

    if (pingCountLeft.current > 0) {
      ping();
    }

    pingDuration.current.push(Date.now() - pingStart.current);
  };

  const ping = () => {
    pingStart.current = Date.now();
    socket.emit('ping', '');
  };

  const start = () => {
    clear();
    ping();
  };

  const clear = () => {
    pingCountLeft.current = count;
    pingDuration.current = [];
    pingStart.current = 0;
  };

  const socketUnsubscribe = () => {
    socket.off('ping', onPong);
  };

  React.useEffect(() => {
    if (!socket || !inUse) {
      socketUnsubscribe();
      return;
    }

    socket.on('ping', onPong);

    return socketUnsubscribe;
  }, [socket, inUse]);

  const completed = pingDuration.current.length === count;

  return {
    start,
    clear,
    completed,
    setInUse,
    pingMs: completed ? pingDuration.current : [],
  };
};
