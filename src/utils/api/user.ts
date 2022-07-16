import {AxiosResponse} from 'axios';

import {PxChartLayoutConfig} from '../../state/config/types';
import {PxDataSlotMap} from '../../state/pxData/types';
import {UserConfigModel, UserConfigModelOriginal} from '../../types/user';
import {apiSendGetRequest, apiSendPostRequest} from './common';


type ApiUpdateSlotMapOpts = {
  token: string,
  slotMap: PxDataSlotMap,
};

export const apiUpdateSlotMap = ({
  token,
  slotMap,
}: ApiUpdateSlotMapOpts): Promise<AxiosResponse<PxDataSlotMap>> => (
  apiSendPostRequest({
    apiPath: '/user/config/update-slot',
    data: new URLSearchParams({
      data: JSON.stringify(slotMap),
    }),
    token,
  })
);

type ApiUpdateLayoutConfigOpts = {
  token: string,
  layoutConfig: PxChartLayoutConfig,
};

export const apiUpdateLayoutConfig = ({
  token,
  layoutConfig,
}: ApiUpdateLayoutConfigOpts): Promise<AxiosResponse<PxChartLayoutConfig>> => (
  apiSendPostRequest({
    apiPath: '/user/config/update-layout',
    data: new URLSearchParams({
      data: JSON.stringify(layoutConfig),
    }),
    token,
  })
);

type ApiGetConfigOpts = {
  token: string,
};

export const apiGetConfig = ({
  token,
}: ApiGetConfigOpts): Promise<UserConfigModel> => (
  apiSendGetRequest<UserConfigModelOriginal>({
    apiPath: '/user/config/get',
    token,
  }).then<UserConfigModel>(({data}) => ({
    accountId: data.account_id,
    layoutConfig: data.layout_config,
    layoutType: data.layout_type,
    slotMap: data.slot_map,
  }))
);
