import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {addTzOffsetOnISODatetime} from './utils';
import {FuturesMarketClosedSession} from '../../../../types/admin';


type Props = {
  sessions: FuturesMarketClosedSession[],
  onRemove: (id: string) => () => void,
  disableAdd: boolean,
};

export const ExistingMarketSessionRows = ({sessions, onRemove, disableAdd}: Props) => {
  return (
    <>
      {sessions.map(({id, security, start, end}, idx) => (
        <tr key={idx}>
          <td>
            {security}
          </td>
          <td>
            <Form.Control
              type="datetime-local"
              value={addTzOffsetOnISODatetime(start)}
              disabled
            />
          </td>
          <td>
            <Form.Control
              type="datetime-local"
              value={addTzOffsetOnISODatetime(end)}
              disabled
            />
          </td>
          <td>
            <Button variant="outline-danger" onClick={onRemove(id)} disabled={disableAdd}>
              <i className="bi bi-x-lg"/>
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};
