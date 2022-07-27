import React from 'react';

import {useSession} from 'next-auth/react';

import {PxSocketContext} from '../../../hooks/socket/px/const';
import {RequestPxMessage} from '../../../hooks/socket/px/type';
import {useCustomSrSelector} from '../../../state/customSr/selector';
import {useProductDataSelector} from '../../../state/data/selector';
import {usePxDataSelector} from '../../../state/pxData/selector';
import {PxSlotName} from '../../../types/pxData';
import {MainLoading} from '../../common/loading/main';
import {PxDataChart} from '../pxData/main';


type Props = {
  slot: PxSlotName,
  width: number,
  height: number,
  x: number,
  y: number,
};

export const PxDataLayoutPane = ({slot, width, height, x, y}: Props) => {
  const {data} = useSession();
  const socket = React.useContext(PxSocketContext);
  const pxData = usePxDataSelector(slot);
  const products = useProductDataSelector();
  const customSrLevels = useCustomSrSelector(pxData?.contract.symbol) || [];

  const containerCss: React.CSSProperties = {
    position: 'absolute',
    // Set the container size for Px data chart
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    // Mainly for centering the loading icon
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const token = data?.user?.token;
  const requestPxData = React.useCallback((offset: number) => {
    if (!socket) {
      throw Error('Socket is [null] while requesting older px data');
    }
    if (!pxData) {
      throw Error('Px data is [null] while requesting older px data');
    }

    const requestMessage: RequestPxMessage = {
      token,
      requests: [{identifier: pxData.uniqueIdentifier, offset}],
    };
    socket.emit('request', requestMessage);
  }, [socket, pxData === null, token]);

  return (
    <div style={containerCss}>
      {
        pxData === null ?
          <MainLoading/> :
          <React.Suspense fallback={<MainLoading/>}>
            <PxDataChart
              title={
                `${products[pxData.contract.symbol]?.name || pxData.contract.symbol} @ ` +
                `${(pxData.periodSec / 60).toFixed(0)}`
              }
              slot={slot}
              chartData={pxData}
              payload={{customSrLevels, requestPxData}}
              height={height}
              width={width}
            />
          </React.Suspense>
      }
    </div>
  );
};
