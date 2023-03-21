import React from 'react';

import {OptionsOi, OptionsOiSingleData} from 'kl-web-common/models/api/info/optionsOi';
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {tickColor} from './const';
import styles from './main.module.scss';
import {OptionsOiTooltip} from './tooltip';
import {bearColor, bullColor} from '../../../../../../components/chart/pxData/plot/const';


type Props = {
  data: OptionsOiSingleData
};

export const OptionsOiChartSingle = ({data}: Props) => {
  const {contractSymbol, data: oiData} = data;

  return (
    <div className={styles['chart-container']}>
      <h4>{contractSymbol}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={oiData} layout="vertical" stackOffset="sign">
          <XAxis type="number" tick={false} tickLine={false} axisLine={false}/>
          <YAxis type="category" tick={{fill: tickColor}} reversed dataKey={({strike}: OptionsOi) => strike}/>
          <Tooltip wrapperStyle={{outline: 'none'}} content={<OptionsOiTooltip/>}/>
          <Bar dataKey={({call}: OptionsOi) => -call.oiCurrent} fill={bullColor} stackId="OI"/>
          <Bar dataKey={({put}: OptionsOi) => put.oiCurrent} fill={bearColor} stackId="OI"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
