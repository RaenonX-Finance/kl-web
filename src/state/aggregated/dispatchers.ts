import {createAction} from '@reduxjs/toolkit';

import {InitData} from '../../types/init';
import {MergedDispatcherName} from './types';


export const mergedDispatchers = {
  [MergedDispatcherName.INIT_APP]: createAction<InitData>(MergedDispatcherName.INIT_APP),
};
