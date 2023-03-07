import React from 'react';

import {IChartApi} from 'lightweight-charts';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import styles from './main.module.scss';
import {LayoutConfigUpdatePayload} from '../../../state/config/type';
import {PxChartSharedConfig} from '../config/shared/main';


export type PxChartToolbarProps<A> = {
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  layoutConfig: A | null,
  renderLayoutConfig: (
    security: string,
    config: A,
    setConfig: (newConfig: LayoutConfigUpdatePayload) => Promise<void>,
  ) => React.ReactNode,
  setLayoutConfig: (newConfig: LayoutConfigUpdatePayload) => Promise<void>,
  security: string,
};

export const PxChartToolbar = <A extends unknown>({
  layoutConfig,
  chartRef,
  renderLayoutConfig,
  setLayoutConfig,
  security,
}: PxChartToolbarProps<A>) => {
  return (
    <>
      <DropdownButton
        className={styles['dropdown']}
        title={<i className="bi bi-three-dots"/>}
        variant="outline-light"
        menuVariant="dark"
        drop="up"
      >
        <PxChartSharedConfig/>
        {
          layoutConfig &&
          renderLayoutConfig(security, layoutConfig, setLayoutConfig)
        }
        <Dropdown.Item onClick={() => {
          chartRef.current?.timeScale().resetTimeScale();
          chartRef.current?.priceScale().applyOptions({autoScale: true});
        }}>
          重設比例
        </Dropdown.Item>
      </DropdownButton>
      <Button size="sm" variant="outline-success" className={styles['to-realtime']} onClick={() => {
        chartRef.current?.timeScale().scrollToRealTime();
      }}>
        <i className="bi bi-chevron-right"/>
      </Button>
    </>
  );
};
