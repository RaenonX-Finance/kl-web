import React from 'react';

import {smcAnalysisPathToTabKey, smcAnalysisTabs, tabKeyToSmcAnalysisPath} from './const';
import {ProtectedLayout} from '../../../components/layout/protected';
import {Panel} from '../../../components/panel/main';


export const SmcAnalysisPanel = () => {
  return (
    <ProtectedLayout>
      <Panel
        keyToPathMap={tabKeyToSmcAnalysisPath}
        pathToKeyMap={smcAnalysisPathToTabKey}
        tabs={smcAnalysisTabs}
      />
    </ProtectedLayout>
  );
};
