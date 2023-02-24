import React from 'react';

import {PxUniqueIdentifier} from 'kl-web-common/models/pxMeta';
import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import {PeriodSelector} from './period';
import {ProductSelector} from './product';
import {TargetSelectorCommonProps} from './type';
import {pxDataDispatchers} from '../../../../state/pxData/dispatchers';
import {PxDataDispatcherName} from '../../../../state/pxData/types';
import {useDispatch} from '../../../../state/store';
import {apiInitPxData} from '../../../../utils/api/px';


type Props = TargetSelectorCommonProps & {
  show: boolean,
  setShow: (show: boolean) => void,
};

export const TargetSelectorModal = ({show, setShow, ...props}: Props) => {
  const {data} = useSession();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = React.useState(false);

  const token = data?.user?.token;

  if (!token) {
    return <></>;
  }

  const beforeUpdate = () => {
    setDisabled(true);
  };

  const afterUpdate = (identifier: PxUniqueIdentifier) => {
    setShow(false);
    setDisabled(false);

    apiInitPxData({
      token,
      requests: [{identifier}],
    })
      .then(({data}) => dispatch(pxDataDispatchers[PxDataDispatcherName.INIT](data)));
  };

  return (
    <Modal show={show} size="lg" onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>商品、週期選擇</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <ProductSelector
              disabled={disabled} token={token}
              beforeUpdate={beforeUpdate} afterUpdate={afterUpdate}
              {...props}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <PeriodSelector
              disabled={disabled} token={token}
              beforeUpdate={beforeUpdate} afterUpdate={afterUpdate}
              {...props}
            />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
