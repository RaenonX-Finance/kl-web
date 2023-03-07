import {handleSrCommon} from './common';
import {OnPxChartUpdatedEvent} from '../../../type';
import {getSrLevelGroupColor, srLevelBasicColor, srLevelBasicCommonOptions, srLevelCommonOptions} from '../../const';


export const handleSR = (e: OnPxChartUpdatedEvent) => {
  const {chartDataRef, chartObjectRef} = e;
  if (!chartObjectRef.current) {
    return;
  }

  const {groups, basic} = chartDataRef.current.supportResistance;

  // Grouped SR
  for (const [idxGroup, levels] of groups.entries()) {
    const srLevelLinesGroup = chartObjectRef.current.initData.lines.srLevelLines.group[idxGroup];

    if (!srLevelLinesGroup) {
      chartObjectRef.current.initData.lines.srLevelLines.group[idxGroup] = {};
    }

    handleSrCommon({
      e,
      keyOfConfig: 'srLevel',
      keyOfConfigLabel: 'srLevelLabel',
      levels,
      lineRecord: chartObjectRef.current.initData.lines.srLevelLines.group[idxGroup],
      color: getSrLevelGroupColor(idxGroup),
      commonOptions: srLevelCommonOptions,
    });
  }

  // Basic SR
  handleSrCommon({
    e,
    keyOfConfig: 'srLevelBasic',
    keyOfConfigLabel: 'srLevelBasicLabel',
    levels: basic,
    lineRecord: chartObjectRef.current.initData.lines.srLevelLines.basic,
    color: srLevelBasicColor,
    commonOptions: srLevelBasicCommonOptions,
  });
};
