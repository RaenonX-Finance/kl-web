import {createAction} from '@reduxjs/toolkit';

import {ConfigDispatcherName, LayoutConfigUpdatePayload, LayoutTypeUpdatePayload} from './types';


export const configDispatchers = {
  [ConfigDispatcherName.UPDATE_LAYOUT]:
    createAction<LayoutTypeUpdatePayload>(ConfigDispatcherName.UPDATE_LAYOUT),
  [ConfigDispatcherName.UPDATE_LAYOUT_CONFIG]:
    createAction<LayoutConfigUpdatePayload>(ConfigDispatcherName.UPDATE_LAYOUT_CONFIG),
};
