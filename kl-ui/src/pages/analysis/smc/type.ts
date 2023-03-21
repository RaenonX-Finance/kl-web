import React from 'react';

import {SmcAnalysisPath} from '../../../const/path';


export type SmcAnalysisTabKey =
  'optionsOi';

export type SmcAnalysisTab = {
  tabKey: SmcAnalysisTabKey,
  name: string,
  link: SmcAnalysisPath,
  Component: React.FunctionComponent,
};
