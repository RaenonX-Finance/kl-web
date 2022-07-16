import {createAction} from '@reduxjs/toolkit';

import {UserConfigModel} from '../../types/user';
import {AggregatedDispatcherName} from './types';


export const aggregatedDispatchers = {
  [AggregatedDispatcherName.INIT_CONFIG]: createAction<UserConfigModel>(AggregatedDispatcherName.INIT_CONFIG),
};
