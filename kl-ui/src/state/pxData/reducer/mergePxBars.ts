import {PxDataBar} from 'kl-web-common/models/api/px/pxDataBar';

import {mergeThenSort} from '../../../utils/arr';


type MergePxDataOptions = {
  newBars: PxDataBar[],
  original: PxDataBar[] | undefined,
  lastInState: PxDataBar,
};

export const mergePxDataBars = ({newBars, original, lastInState}: MergePxDataOptions): PxDataBar[] => {
  let data = mergeThenSort(
    original || [],
    newBars,
    ({epochSecond}) => epochSecond,
  );

  const lastBarOfMerged = data.at(-1);

  // Only merge last if new history data (`newBars`) doesn't get a new bar
  // - `original` and `newBars` are sorted by epoch sec ASC already
  if (original && lastBarOfMerged && original.at(-1)?.epochSecond === newBars.at(-1)?.epochSecond) {
    // `newBars` originates from history data.
    // The last close of history data is delayed from the current price,
    // because `KL.PxParse` batches history data update for storing into DB.
    // Therefore,
    // - The last bar is the last of H/L of the merged (data from history) and the data in state (data from realtime)
    // - Close takes in-state (data from realtime), because Realtime data is the latest data
    data = [
      ...data.slice(0, -1),
      {
        ...lastBarOfMerged,
        high: Math.max(lastBarOfMerged.high, lastInState.high),
        low: Math.min(lastBarOfMerged.low, lastInState.low),
        close: lastInState.close,
      },
    ];
  }

  return data;
};
