import {PxDataMap} from '../types/pxData';


export const updateCurrentPxDataTitle = (pxDataMap: PxDataMap) => {
  const currentPx: {[symbol: string]: string} = {};

  Object.values(pxDataMap).forEach((pxData) => {
    if (!pxData) {
      return;
    }

    const lastBar = pxData.data.at(-1);

    if (!lastBar) {
      return;
    }

    currentPx[pxData.contract.symbol] = lastBar.close.toFixed(pxData.contract.decimals);
  });

  document.title = Object.entries(currentPx).map(([symbol, px]) => `${symbol} ${px}`).join(' ');
};
