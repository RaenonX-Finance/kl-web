import {SmcTabOptionsOi} from './tabs/optionsOi/main';
import {SmcAnalysisTab, SmcAnalysisTabKey} from './type';
import {SmcAnalysisPath} from '../../../const/path';


export const smcAnalysisTabs: SmcAnalysisTab[] = [
  {
    tabKey: 'optionsOi',
    name: '台指選擇權未平倉量',
    link: SmcAnalysisPath.OPTIONS_OI,
    Component: SmcTabOptionsOi,
  },
];

export const tabKeyToSmcAnalysisPath: {[key in SmcAnalysisTabKey]: SmcAnalysisPath} = {
  optionsOi: SmcAnalysisPath.OPTIONS_OI,
};

export const smcAnalysisPathToTabKey: {[key in SmcAnalysisPath]: SmcAnalysisTabKey} = {
  [SmcAnalysisPath.OPTIONS_OI]: 'optionsOi',
};
