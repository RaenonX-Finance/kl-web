import React from 'react';

import {AxiosResponse} from 'axios';

import {getErrorMessage} from './error';
import {errorDispatchers} from '../state/error/dispatchers';
import {ErrorDispatcherName} from '../state/error/types';
import {useDispatch} from '../state/store';


type FetchStatusNotFetched = {
  fetched: false,
  fetching: false,
};

type FetchStatusFetching = {
  fetched: false,
  fetching: true,
};

type FetchStatusFetched = {
  fetched: true,
  fetching: false,
};

export type FetchStatusSimple = FetchStatusNotFetched | FetchStatusFetching | FetchStatusFetched;

export type FetchStatus<D> = FetchStatusSimple & {
  data: D,
  lastSuccessEpochMs: number | null,
  fetchError: boolean,
};

export type FetchPayload<P> = {
  force?: boolean,
  payload: P,
};

export const isNotFetched = <T extends FetchStatusSimple>(fetchStatus: T) => {
  return !fetchStatus.fetched && !fetchStatus.fetching;
};

type FetchStateReturns<D, P> = {
  fetchStatus: FetchStatus<D>,
  fetchFunction: (payload: FetchPayload<P>) => void,
  setFetchStatus: React.Dispatch<React.SetStateAction<FetchStatus<D>>>,
};

export const useFetchStateProcessed = <D, R, P>(
  initialData: D,
  fnFetch: (payload: P) => Promise<R>,
  messageOnFetchFailed: string,
  fnProcessData: (response: R) => D,
): FetchStateReturns<D, P> => {
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus<D>>({
    fetched: false,
    fetching: false,
    fetchError: false,
    data: initialData,
    lastSuccessEpochMs: null,
  });
  const dispatch = useDispatch();

  const fetchFunction = ({force, payload}: FetchPayload<P>) => {
    if (!force && !isNotFetched(fetchStatus)) {
      return;
    }

    setFetchStatus((status) => ({
      ...status,
      fetching: true,
      fetched: false,
    }));

    fnFetch(payload)
      .then((data) => {
        setFetchStatus((status) => ({
          ...status,
          fetched: true,
          fetching: false,
          fetchError: false,
          lastSuccessEpochMs: Date.now(),
          data: fnProcessData(data),
        }));
      })
      .catch((err) => {
        setFetchStatus((status) => ({
          ...status,
          fetched: true,
          fetching: false,
          fetchError: true,
        }));
        console.warn(messageOnFetchFailed, err);
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `${messageOnFetchFailed}\n${getErrorMessage({err})}`,
        }));
      });
  };

  return {fetchStatus, fetchFunction, setFetchStatus};
};


export const useFetchState = <D, P>(
  initialData: D,
  fnFetch: (payload: P) => Promise<AxiosResponse<D>>,
  messageOnFetchFailed: string,
): FetchStateReturns<D, P> => {
  return useFetchStateProcessed(initialData, fnFetch, messageOnFetchFailed, ({data}) => data);
};
