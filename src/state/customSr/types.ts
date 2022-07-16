import {CustomSrLevelDict} from '../../types/init';
import {StateBase} from '../types';


export const SR_CUSTOM_STATE_NAME = 'SrCustom';

export type CustomSrLevelState = StateBase & CustomSrLevelDict;
