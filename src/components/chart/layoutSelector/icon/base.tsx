import React from 'react';

import Button from 'react-bootstrap/Button';

import {configDispatchers} from '../../../../state/config/dispatchers';
import {ConfigDispatcherName} from '../../../../state/config/types';
import {useDispatch} from '../../../../state/store';
import {LayoutType} from '../type';
import styles from './main.module.scss';
import {SlicerLineProps} from './type';


type Props = {
  lines: SlicerLineProps[],
  layoutType: LayoutType,
  onClick: () => void,
  size?: number,
};

export const LayoutIconBase = ({lines, layoutType, onClick, size = 32}: Props) => {
  const dispatch = useDispatch();

  const onButtonClick = () => {
    onClick();
    dispatch(configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT](layoutType));
  };

  return (
    <Button className={styles['layout-option']} variant="dark-info" onClick={onButtonClick}>
      <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" version="1.1">
        <g stroke="white">
          {lines.map(({x1, y1, x2, y2}, idx) => (
            <line
              key={idx}
              x1={x1 * size} y1={y1 * size}
              x2={x2 * size} y2={y2 * size}
              strokeWidth="2"
            />
          ))}
          <rect
            x="0" y="0"
            width={size} height={size}
            style={{fill: 'transparent', strokeWidth: 2}}
          />
        </g>
      </svg>
    </Button>
  );
};
