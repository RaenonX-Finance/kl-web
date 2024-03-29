import {Session} from 'next-auth';

import {AccountData} from '../types/admin';
import {PxDataMap, PxSlotName} from '../types/pxData';


type UpdateChartPageTitleOpts = {
  validSlotNames: PxSlotName[] | null,
  pxDataMap: PxDataMap,
};

export const updateChartPageTitle = ({validSlotNames, pxDataMap}: UpdateChartPageTitleOpts) => {
  const currentPx: {[symbol: string]: string} = {};

  Object.entries(pxDataMap).forEach(([slotStr, pxData]) => {
    const slot = slotStr as PxSlotName;

    if (!pxData || !validSlotNames?.includes(slot)) {
      return;
    }

    const lastBar = pxData.data.at(-1);

    if (!lastBar) {
      return;
    }

    currentPx[pxData.contract.name] = lastBar.close.toFixed(pxData.contract.decimals);
  });

  updateTitle(Object.entries(currentPx).map(([name, px]) => `${name} ${px}`).join(' '));
};

export const updateOptionsOiTitle = (contractSymbol: string | null | undefined) => {
  updateTitle(`選擇權 OI - ${contractSymbol || '(?)'}`);
};

export const updateAccountViewTitle = (accountData: AccountData[]) => {
  updateTitle(`會員狀態 (${accountData.filter((account) => account.online).length} 在線)`);
};

export const updateAccountInfoTitle = (data: Session) => {
  updateTitle(`${data.user.username} 的會員資訊`);
};

export const updateTitle = (title: string) => {
  document.title = title;
};
