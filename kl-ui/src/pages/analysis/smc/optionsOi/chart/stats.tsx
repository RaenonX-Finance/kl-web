import React from 'react';

import {OptionsOiSingleData} from 'kl-web-common/models/api/info/optionsOi';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';

import styles from './main.module.scss';
import {bearColor, bullColor} from '../../../../../components/chart/pxData/plot/const';
import {sum} from '../../../../../utils/calc';
import {formatSignedNumber} from '../../../../../utils/string';


type Props = {
  data: OptionsOiSingleData['data'],
};

export const OptionsOiStats = ({data}: Props) => {
  const call = sum(data.map(({call}) => call.oiCurrent));
  const put = sum(data.map(({put}) => put.oiCurrent));
  const callChange = sum(data.map(({call}) => call.oiChangeVal));
  const putChange = sum(data.map(({put}) => put.oiChangeVal));
  const callPrev = call - callChange;
  const putPrev = put - putChange;

  const total = call + put;

  const pcRatio = put / call;
  const pcRatioPrev = putPrev / callPrev;

  return (
    <Table size="sm" className="text-center" variant="dark">
      <tbody>
        <tr>
          <td className="w-33">Call</td>
          <td rowSpan={2} className={pcRatio > 1 ? styles['pc-ratio-bear'] : styles['pc-ratio-bull']}>
            <h5>P/C Ratio</h5>
            <span className={pcRatioPrev > 1 ? styles['pc-ratio-bear'] : styles['pc-ratio-bull']}>
              {pcRatioPrev.toFixed(3)}
            </span>
            <small className="mx-1">
              <i className="bi bi-chevron-right"/>
            </small>
            <span className="h4">
              {pcRatio.toFixed(3)}
            </span>
          </td>
          <td className="w-33">Put</td>
        </tr>
        <tr>
          <td style={{color: bullColor}}>
            <span className="h4">{call}</span>
            &nbsp;
            <small>({formatSignedNumber(callChange, 0)})</small>
            <br/>
            {(call / total * 100).toFixed(2)}%
          </td>
          <td style={{color: bearColor}}>
            <span className="h4">{put}</span>
            &nbsp;
            <small>({formatSignedNumber(putChange, 0)})</small>
            <br/>
            {(put / total * 100).toFixed(2)}%
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <ProgressBar>
              <ProgressBar style={{backgroundColor: bullColor}} now={call}/>
              <ProgressBar style={{backgroundColor: bearColor}} now={put}/>
            </ProgressBar>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
