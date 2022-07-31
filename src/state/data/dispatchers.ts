import {createAction} from '@reduxjs/toolkit';

import {ServerMinChangeMessage} from '../../types/minChange';
import {DataDispatcherName} from './types';


export const dataDispatchers = {
  [DataDispatcherName.MIN_CHANGE]: createAction<ServerMinChangeMessage>(DataDispatcherName.MIN_CHANGE),
};
