import React from 'react';

import {getIdentifierDetails} from 'kl-web-common/utils/pxModel';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';

import {TargetSelectorModal} from './modal';
import {TargetSelectorCommonProps, TargetState} from './type';
import {usePeriodDataSelector, useProductDataSelector} from '../../../../state/data/selector';
import {usePxSlotIdentifier} from '../../../../state/pxData/selector';


export const TargetSelector = (props: TargetSelectorCommonProps) => {
  const {pxData, slot} = props;

  const {data} = useSession();
  const products = useProductDataSelector();
  const periods = usePeriodDataSelector();
  const identifier = usePxSlotIdentifier(slot);

  const identifierDetails = identifier ? getIdentifierDetails(identifier) : null;

  const [show, setShow] = React.useState(false);
  const [target, setTarget] = React.useState<TargetState>({
    selected: {
      symbol: identifierDetails?.symbol ?? null,
      periodMin: identifierDetails?.periodMin ?? null,
    },
    queued: {
      symbol: pxData?.contract.symbol ?? null,
      periodMin: pxData ? pxData.periodSec / 60 : null,
    },
  });

  // `products` and `periods` could be an empty map on init because the product info returns slower
  let buttonText;
  if (pxData) {
    const symbol = products[pxData.contract.symbol]?.name ?? pxData.contract.symbol;
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
      <Button variant="outline-light" size="sm" disabled={!token} onClick={() => setShow(true)}>
        {buttonText}
      </Button>
    </>
  );
};
