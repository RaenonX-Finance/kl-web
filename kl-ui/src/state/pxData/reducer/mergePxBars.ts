import {PxDataBar} from 'kl-web-common/models/api/px/pxDataBar';

import {mergeThenSort} from '../../../utils/arr';


type MergePxDataOptions = {
  newBars: PxDataBar[],
  original: PxDataBar[] | undefined,
  noLastOverwrite: boolean,
};

export const mergePxDataBars = ({newBars, original, noLastOverwrite}: MergePxDataOptions): PxDataBar[] => {
  let data = mergeThenSort(
    original || [],
    newBars,
    ({epochSecond}) => epochSecond,
  );

  const lastBar = data.at(-1);
  if (!noLastOverwrite && original && lastBar) {
    data = [
      ...data.slice(0, -1),
      {...lastBar, close: original.at(-1)?.close || lastBar.close},
    ];
  }

  return data;
};
