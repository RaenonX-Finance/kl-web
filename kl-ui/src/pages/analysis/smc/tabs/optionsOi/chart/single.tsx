import React from 'react';

import {OptionsOiSingleData} from 'kl-web-common/models/api/info/optionsOi';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {OptionsOiInfoText} from './info';
import styles from './main.module.scss';
import {OptionsOiMeta} from './meta';
import {OptionsOiStats} from './stats';


export type OptionsOiChartSingleProps = {
  data: OptionsOiSingleData
};

export const OptionsOiChartSingle = (props: OptionsOiChartSingleProps) => {
  const {currentPx, data: oiData} = props.data;

  const [showDiffBar, setShowDiffBar] = React.useState(false);

  const maxCall = maxBy(oiData, ({call}) => call.oiCurrent);
  const maxPut = maxBy(oiData, ({put}) => put.oiCurrent);
  const closestStrike = minBy(oiData, ({strike}) => Math.abs(currentPx - strike));
  const max = Math.max(
    maxCall?.call.oiCurrent ?? 0 + (showDiffBar ? maxCall?.call.oiChangeVal ?? 0 : 0),
    maxPut?.put.oiCurrent ?? 0 + (showDiffBar ? maxPut?.put.oiChangeVal ?? 0 : 0),
  );

  return (
    <>
      <OptionsOiMeta {...props}/>
      <div className={styles['chart-container']}>
        <Table className={styles['oi-chart']}>
          <thead>
            <tr>
              <th className={styles['oi-header']}>Call OI</th>
              <th className={styles['oi-text-header']}/>
              <th className={styles['strike-header']}>行權價</th>
              <th className={styles['oi-text-header']}/>
              <th className={styles['oi-header']}>Put OI</th>
            </tr>
          </thead>
          <tbody>
            {oiData.map(({strike, call, put}) => {
              const isMaxCall = maxCall?.call.oiCurrent === call.oiCurrent;
              const isMaxPut = maxPut?.put.oiCurrent === put.oiCurrent;
              const isClosestStrike = closestStrike?.strike === strike;

              let strikeTextClass;
              if (isMaxCall && isMaxPut) {
                strikeTextClass = styles['strike-both'];
              } else if (isMaxCall) {
                strikeTextClass = styles['strike-call'];
              } else if (isMaxPut) {
                strikeTextClass = styles['strike-put'];
              } else {
                strikeTextClass = styles['strike'];
              }

              return (
                <tr key={strike} className={isClosestStrike ? styles['current-strike'] : undefined}>
                  <td className={styles['oi']}>
                    <ProgressBar className={isMaxCall ? styles['oi-bar-call-max'] : styles['oi-bar-call']}>
                      <ProgressBar
                        now={call.oiCurrent - (showDiffBar ? Math.abs(call.oiChangeVal) : 0)} max={max}
                        className={styles['oi-bar-main']}
                      />
                      {
                        showDiffBar &&
                        <ProgressBar now={Math.max(call.oiChangeVal, 0)} max={max} className={styles['oi-bar-inc']}/>
                      }
                      {
                        showDiffBar &&
                        <ProgressBar now={-Math.min(call.oiChangeVal, 0)} max={max} className={styles['oi-bar-dec']}/>
                      }
                    </ProgressBar>
                  </td>
                  <td className={styles['oi-text']}>
                    <OptionsOiInfoText data={call} isMaxCall={isMaxCall}/>
                  </td>
                  <td className={`${strikeTextClass} ${styles['current-strike']}`}>
                    {strike}
                  </td>
                  <td className={styles['oi-text']}>
                    <OptionsOiInfoText data={put} isMaxPut={isMaxPut}/>
                  </td>
                  <td className={styles['oi']}>
                    <ProgressBar className={isMaxPut ? styles['oi-bar-put-max'] : styles['oi-bar-put']}>
                      <ProgressBar
                        now={put.oiCurrent - (showDiffBar ? Math.abs(put.oiChangeVal) : 0)} max={max}
                        className={styles['oi-bar-main']}
                      />
                      {
                        showDiffBar &&
                        <ProgressBar now={Math.max(put.oiChangeVal, 0)} max={max} className={styles['oi-bar-inc']}/>
                      }
                      {
                        showDiffBar &&
                        <ProgressBar now={-Math.min(put.oiChangeVal, 0)} max={max} className={styles['oi-bar-dec']}/>
                      }
                    </ProgressBar>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Row className="my-2">
        <Col className="text-end">
          <Button
            className={styles['toggle-diff-bar']} variant={showDiffBar ? 'outline-danger' : 'outline-success'}
            onClick={() => setShowDiffBar(!showDiffBar)} size="sm"
          >
            {`${showDiffBar ? '隱藏' : '顯示'}當日差異圖示`}
          </Button>
        </Col>
      </Row>
      <OptionsOiStats data={oiData}/>
    </>
  );
};
