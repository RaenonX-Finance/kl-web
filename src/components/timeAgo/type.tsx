import React from 'react';


export type TimeAgoProps = {
  epochSec: number | undefined,
  format: (secDiffMs: number) => React.ReactNode,
  updateMs: number,
  className?: string,
  onClick?: () => void,
};
