import React from 'react';

import {PxUniqueIdentifier} from 'kl-web-common/models/api/px/pxMeta';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {PeriodSelector} from './period';
import {ProductSelector} from './product';
import {TargetSelectorButtonProps, TargetSelectorCommonProps, TargetState} from './type';
import {useHandleAxiosError} from '../../../../hooks/axios';
import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {pxDataDispatchers} from '../../../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../../../state/pxData/types';
import {useDispatch} from '../../../../state/store';
import {apiInitPxData} from '../../../../utils/api/px/data';


type Props = Pick<TargetSelectorCommonProps, 'slot'> & {
  show: boolean,
  setShow: (show: boolean) => void,
  token: string,
  target: TargetState,
  setTarget: React.Dispatch<React.SetStateAction<TargetState>>,
};

export const TargetSelectorModal = ({slot, show, setShow, token, target, setTarget}: Props) => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = React.useState(false);
  const {onError} = useHandleAxiosError();

  const onClick: TargetSelectorButtonProps['onClick'] = async (update) => {
    const newTargetSelected: TargetState = {
      selected: {...target.selected, ...update},
      queued: {...target.queued, ...update},
    };
    setTarget(newTargetSelected);

    const {symbol, periodMin} = newTargetSelected.queued;

    if (!symbol || !periodMin) {
      return;
    }

    setUpdating(true);

    try {
      dispatch(pxDataDispatchers[PxDataDispatcherName.UPDATE_SLOT_MAP]({token, slot, symbol, periodMin}));
    } catch (error) {
      if (typeof error === 'string') {
        dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: error}));
      }
      console.error(error);
    } finally {
      setShow(false);
      setUpdating(false);

      const identifier: PxUniqueIdentifier = `${symbol}@${periodMin}`;

      apiInitPxData({
        token,
        requests: [{identifier}],
        onRetryAttempt: () => dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({
          message: `${identifier} 的初始報價資料要求逾時，重試中...`,
        })),
        onRetrySuccess: () => dispatch(errorDispatchers[ErrorDispatcherName.HIDE_ERROR]()),
      })
        .then(({data}) => dispatch(pxDataDispatchers[PxDataDispatcherName.INIT](data)))
        .catch(onError);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>商品、週期選擇</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <PeriodSelector updating={updating} onClick={onClick} target={target}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <ProductSelector updating={updating} onClick={onClick} target={target}/>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
