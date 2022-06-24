import {createAction} from '@reduxjs/toolkit';

import {LayoutType} from '../../components/chart/layoutSelector/type';
import {ConfigDispatcherName} from './types';


export const configDispatchers = {
  [ConfigDispatcherName.UPDATE_LAYOUT]: createAction<LayoutType>(ConfigDispatcherName.UPDATE_LAYOUT),
};
