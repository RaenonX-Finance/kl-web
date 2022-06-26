import React from 'react';

import {StrengthIndex} from './type';


export const useMockStrengthIdxGenerator = (): StrengthIndex => {
  const [idx, setIdx] = React.useState(Math.floor(Date.now() / 1000 % 7));

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setIdx(Math.floor(Date.now() / 2000 % 7));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return idx - 3 as StrengthIndex;
};
