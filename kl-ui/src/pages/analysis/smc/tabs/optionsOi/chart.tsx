import React from 'react';

import {OptionsOiData} from 'kl-web-common/models/api/info/optionsOi';


type Props = {
  data: OptionsOiData
};

export const OptionsOiChart = ({data}: Props) => {
  // TODO: Add layout
  return <>{JSON.stringify(data)}</>;
};
