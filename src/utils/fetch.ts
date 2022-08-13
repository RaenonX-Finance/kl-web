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

type FetchStateReturns<D> = {
  fetchStatus: FetchStatus<D>,
  fetchFunction: () => void,
  setFetchStatus: React.Dispatch<React.SetStateAction<FetchStatus<D>>>,
};

export const useFetchStateProcessed = <D, R>(
  initialData: D,
  fnFetch: (callback?: (data: R) => void) => Promise<R>,
  messageOnFetchFailed: string,
  fnProcessData: (response: R) => D,
): FetchStateReturns<D> => {
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus<D>>({
    fetched: false,
    fetching: false,
    fetchError: false,
    data: initialData,
  });

  const fetchFunction = () => {
    if (!isNotFetched(fetchStatus)) {
      return;
    }

    setFetchStatus({
      ...fetchStatus,
      fetching: true,
      fetched: false,
    });

    fnFetch()
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


export const useFetchState = <D>(
  initialData: D,
  fnFetch: () => Promise<AxiosResponse<D>>,
  messageOnFetchFailed: string,
): FetchStateReturns<D> => {
  return useFetchStateProcessed(initialData, fnFetch, messageOnFetchFailed, (data) => data.data);
};
