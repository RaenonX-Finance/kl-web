import React from 'react';

import useResizeObserver from 'use-resize-observer';

import {PxLayoutContent} from './content';
import styles from './main.module.scss';
import {usePxDataSelector, usePxSlotIdentifier} from '../../../../state/pxData/selector';
import {PxSlotName} from '../../../../types/pxData';
import {TargetSelector} from '../../pxData/targetSelector/main';


export type PxLayoutContainerProps = {
  slot: PxSlotName,
  width: number,
  height: number,
  x: number,
  y: number,
};

export const PxLayoutContainer = (props: PxLayoutContainerProps) => {
  const {slot, width, height, x, y} = props;

  const {ref, height: selectorHeight} = useResizeObserver<HTMLDivElement>();
  const pxData = usePxDataSelector(slot);
  const identifier = usePxSlotIdentifier(slot);

  const containerCss: React.CSSProperties = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  const heightOfChart = height - (selectorHeight || 0);

  return (
    <div className={styles['container']} style={containerCss}>
      <div className={styles['container']} style={{width}} ref={ref}>
        <TargetSelector pxData={pxData} slot={slot} identifier={identifier}/>
      </div>
      <div className={styles['container']} style={{width, height: heightOfChart}}>
        <PxLayoutContent {...props} height={heightOfChart} identifier={identifier}/>
      </div>
    </div>
  );
};
