import {ErrorMessage} from '../../types/error';
import {StateBase} from '../types';


export const ERROR_STATE_NAME = 'Error';

export enum ErrorDispatcherName {
  UPDATE = 'Error/UpdateErrorMessage',
  HIDE_ERROR = 'Error/HideError',
}

export type ErrorState = StateBase & ErrorMessage & {
  show: boolean,
  timestamp: Date | null,
};

export type ErrorSelectorReturn = ErrorState;
