import React from 'react';

import {DateOnly} from 'kl-web-common/models/dateOnly';

import {FetchStatus} from '../../../../utils/fetch';


export type SmcPageRenderProps<D> = {
  data: D,
  date: DateOnly,
  setData: React.Dispatch<React.SetStateAction<FetchStatus<D>>>,
};
