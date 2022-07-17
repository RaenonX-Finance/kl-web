import {createAction} from '@reduxjs/toolkit';

import {LayoutType} from '../../components/chart/layoutSelector/type';
import {ConfigDispatcherName, LayoutConfigUpdatePayload} from './types';


export const configDispatchers = {
  [ConfigDispatcherName.UPDATE_LAYOUT]:
    createAction<LayoutType>(ConfigDispatcherName.UPDATE_LAYOUT),
  [ConfigDispatcherName.UPDATE_LAYOUT_CONFIG]:
    createAction<LayoutConfigUpdatePayload>(ConfigDispatcherName.UPDATE_LAYOUT_CONFIG),
};
