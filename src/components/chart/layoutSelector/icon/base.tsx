import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';

import {useLayout} from '../../../../hooks/layout/main';
import {configDispatchers} from '../../../../state/config/dispatchers';
import {useLayoutTypeConfigSelector} from '../../../../state/config/selector';
import {ConfigDispatcherName} from '../../../../state/config/type';
import {useDispatch} from '../../../../state/store';
import {LayoutType} from '../type';
import styles from './main.module.scss';
import {SlicerLineProps} from './type';


type Props = {
  lines: SlicerLineProps[],
  layoutType: LayoutType,
  onClick: () => void,
  size?: number,
  hideOnPortrait?: boolean,
};

export const LayoutIconBase = ({lines, layoutType, onClick, size = 32, hideOnPortrait = true}: Props) => {
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const configLayoutType = useLayoutTypeConfigSelector();
  const {isLandscape} = useLayout();

  const onButtonClick = () => {
    onClick();
    dispatch(configDispatchers[ConfigDispatcherName.UPDATE_LAYOUT_TYPE]({
      layoutType,
      token: session?.user?.token,
    }));
  };

  if (!configLayoutType || (hideOnPortrait && !isLandscape)) {
    return <></>;
  }

  return (
    <Button
      className={styles['layout-option']}
      variant={layoutType === configLayoutType ? 'dark-info' : 'secondary'}
      onClick={onButtonClick}
    >
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
