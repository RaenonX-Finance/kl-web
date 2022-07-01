import React from 'react';

import {TimeAgoProps} from './type';


export const TimeAgo = React.forwardRef<HTMLSpanElement, TimeAgoProps>((
  {epochSec, format, updateMs, className, onClick},
  ref,
) => {
  const [secAgo, setSecAgo] = React.useState((Date.now() - epochSec) / 1000);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setSecAgo((Date.now() - epochSec) / 1000),
      updateMs,
    );

    return () => clearInterval(intervalId);
  }, [epochSec]);

  return <span ref={ref} className={className} onClick={onClick}>{format(secAgo)}</span>;
});
TimeAgo.displayName = 'TimeAgo';
