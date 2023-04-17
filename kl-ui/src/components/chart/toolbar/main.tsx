import React from 'react';

import {IChartApi} from 'lightweight-charts';
import Button from 'react-bootstrap/Button';

import styles from './main.module.scss';
import {LayoutConfigUpdatePayload} from '../../../state/config/type';


export type PxToolbarRenderLayoutConfigOpts<A> = {
  security: string,
  layoutConfig: A,
  setLayoutConfig: (newConfig: LayoutConfigUpdatePayload) => Promise<void>,
  show: boolean,
  setShow: (show: boolean) => void,
};

export type PxChartToolbarProps<A> = {
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  layoutConfig: A | null,
  renderLayoutConfig: (opts: PxToolbarRenderLayoutConfigOpts<A>) => React.ReactNode,
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
  const [show, setShow] = React.useState(false);

  return (
    <>
      {layoutConfig && renderLayoutConfig({security, layoutConfig, setLayoutConfig, show, setShow})}
      <Button size="sm" variant="outline-warning" className={styles['setting-button']} onClick={() => setShow(true)}>
        <i className="bi bi-gear"></i>
      </Button>
      <Button size="sm" variant="outline-success" className={styles['action-button']} onClick={() => {
        chartRef.current?.timeScale().scrollToRealTime();
      }}>
        <i className="bi bi-chevron-right"/>
      </Button>
    </>
  );
};
