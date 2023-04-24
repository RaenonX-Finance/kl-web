import {handleSrCommon} from './common';
import {OnPxChartUpdatedEvent} from '../../../type';
import {getSrLevelColor, srLevelCommonOptions} from '../../const';


export const handleSR = (e: OnPxChartUpdatedEvent) => {
  const {chartDataRef, chartObjectRef} = e;
  if (!chartObjectRef.current) {
    return;
  }

  for (const [idx, levels] of chartDataRef.current.supportResistance.entries()) {
    const srLevelLines = chartObjectRef.current.initData.lines.srLevelLines[idx];

    if (!srLevelLines) {
      chartObjectRef.current.initData.lines.srLevelLines[idx] = {};
    }

    handleSrCommon({
      e,
      keyOfConfig: 'srLevel',
      keyOfConfigLabel: 'srLevelLabel',
      levels,
      lineRecord: chartObjectRef.current.initData.lines.srLevelLines[idx],
      color: getSrLevelColor(idx),
      commonOptions: srLevelCommonOptions,
    });
  }
};
