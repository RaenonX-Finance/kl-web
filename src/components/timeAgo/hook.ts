import React from 'react';

import {SocketContext} from '../../types/socket/socket';


type UsePingSocketOptions = {
  count: number,
};

type UsePingSocketReturn = {
  pingCount: number,
  start: () => void,
  clear: () => void,
  pingMs: number[],
  setInUse: (inUse: boolean) => void,
};

export const usePingSocket = ({count}: UsePingSocketOptions): UsePingSocketReturn => {
  const socket = React.useContext(SocketContext);
  const [inUse, setInUse] = React.useState(false);
  const pingCountInternal = React.useRef(0);
  // Use state to intentionally trigger re-render on complete
  // > Separating `ref` (actual) and `state` (for UI)
  // > because the output will be incorrect in case the server responds faster than UI re-render
  const [pingCount, setPingCount] = React.useState(count);
  const pingStart = React.useRef(0);
  const pingDuration = React.useRef<number[]>([]);

  if (!socket) {
    return {
      pingCount: 0,
      start: () => console.error('Socket unavailable for testing ping (start)'),
      clear: () => console.error('Socket unavailable for testing ping (clear)'),
      setInUse: () => console.error('Socket unavailable for testing ping (setInUse)'),
      pingMs: [],
    };
  }

  const onPong = () => {
    pingCountInternal.current += 1;
    setPingCount(pingCountInternal.current);

    // This needs to place before `ping()` because `pingStart` resets in `ping()`
    pingDuration.current.push(Date.now() - pingStart.current);

    if (pingCountInternal.current < count) {
      ping();
    }
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
    pingCountInternal.current = 0;
    pingDuration.current = [];
    pingStart.current = 0;
    setPingCount(0);
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

  return {
    start,
    clear,
    pingCount,
    setInUse,
    pingMs: pingDuration.current,
  };
};
