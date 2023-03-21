import React from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';
import {TooltipProps} from 'recharts';

import styles from './main.module.scss';


export const OptionsOiTooltip = ({active, payload, label}: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) {
    return <></>;
  }

  const [call, put] = payload;

  const callVal = Math.abs(call.value ?? 0);
  const putVal = Math.abs(put.value ?? 0);

  return (
    <div className={styles['tooltip']}>
      <Table size="sm" className="text-center" variant="dark">
        <tbody>
          <tr>
            <td>Call</td>
            <td rowSpan={2} className={styles['strike']}>
              {label}
            </td>
            <td>Put</td>
          </tr>
          <tr>
            <td style={{color: call.color}}>{callVal}</td>
            <td style={{color: put.color}}>{putVal}</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <ProgressBar>
                <ProgressBar style={{backgroundColor: call.color}} now={callVal}/>
                <ProgressBar style={{backgroundColor: put.color}} now={putVal}/>
              </ProgressBar>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
