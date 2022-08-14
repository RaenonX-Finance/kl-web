import React from 'react';

import {AxiosResponse} from 'axios';


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
  fetchError: boolean,
};

export const isNotFetched = <T extends FetchStatusSimple>(fetchStatus: T) => {
  return !fetchStatus.fetched && !fetchStatus.fetching;
};

type FetchStateReturns<D, P> = {
  fetchStatus: FetchStatus<D>,
  fetchFunction: (payload: P) => void,
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
  });

  const fetchFunction = (payload: P) => {
    if (!isNotFetched(fetchStatus)) {
      return;
    }

    setFetchStatus({
      ...fetchStatus,
      fetching: true,
      fetched: false,
    });

    fnFetch(payload)
      .then((data) => {
        setFetchStatus({
          ...fetchStatus,
          fetched: true,
          fetching: false,
          data: fnProcessData(data),
        });
      })
      .catch((e) => {
        setFetchStatus({
          ...fetchStatus,
          fetched: true,
          fetching: false,
          fetchError: true,
        });
        console.warn(messageOnFetchFailed, e);
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
