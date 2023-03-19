import React from 'react';

import {PxUniqueIdentifier} from 'kl-web-common/models/pxMeta';
import {getIdentifierDetails} from 'kl-web-common/utils/pxModel';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from './main.module.scss';
import {TargetSelectorModal} from './modal';
import {TargetSelectorCommonProps, TargetState} from './type';
import {usePeriodDataSelector, useProductDataSelector} from '../../../../state/data/selector';


type Props = TargetSelectorCommonProps & {
  identifier: PxUniqueIdentifier | null
};

export const TargetSelector = (props: Props) => {
  const {pxData, slot, identifier} = props;

  const {data} = useSession();
  const products = useProductDataSelector();
  const periods = usePeriodDataSelector();

  const identifierDetails = identifier ? getIdentifierDetails(identifier) : null;

  const getAutoQueuedTarget = () => {
    return {
      symbol: pxData?.contract.symbol ??
        (identifierDetails ? products[identifierDetails.symbol]?.symbol : null),
      periodMin: pxData ?
        pxData.periodSec / 60 :
        (identifierDetails ? periods[identifierDetails.periodMin]?.min : null),
    };
  };

  const [show, setShow] = React.useState(false);
  const [target, setTarget] = React.useState<TargetState>({
    selected: {
      symbol: identifierDetails?.symbol ?? null,
      periodMin: identifierDetails?.periodMin ?? null,
    },
    queued: getAutoQueuedTarget(),
  });

  // `pxData` could be `undefined` on initial render (loading),
  // so the initial state of `target` will not use the correct initial value
  React.useEffect(() => {
    setTarget((original) => ({
      ...original,
      queued: getAutoQueuedTarget(),
    }));
  }, [pxData]);

  // `products` and `periods` could be an empty map on init because the product info returns slower
  let buttonText;
  if (pxData) {
    const symbol = products[pxData.contract.symbol]?.name ?? pxData?.contract.symbol ?? target.selected.symbol;
    const periodMin = pxData.periodSec / 60;
    const period = periods[periodMin]?.name ?? periodMin;

    buttonText = `${symbol} @ ${period}`;
  } else {
    buttonText = `${target.selected.symbol} @ ${target.selected.periodMin}`;
  }

  const token = data?.user?.token;

  return (
    <>
      {
        token &&
        <TargetSelectorModal
          slot={slot} show={show} setShow={setShow} token={token} target={target} setTarget={setTarget}
        />
      }
      <Button
        className={styles['selector']} variant="dark"
        size="sm" disabled={!token} onClick={() => setShow(true)}
      >
        <Row className="text-start">
          <Col xs="auto">
            {buttonText}
          </Col>
          <Col xs className="text-end">
            {pxData && products[pxData.contract.symbol]?.sourceInfo.exchangeName}
          </Col>
        </Row>
      </Button>
    </>
  );
};
