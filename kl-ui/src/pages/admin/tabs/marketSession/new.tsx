import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {errorDispatchers} from '../../../../state/error/dispatchers';
import {ErrorDispatcherName} from '../../../../state/error/types';
import {useDispatch} from '../../../../state/store';
import {FuturesMarketClosedSession} from '../../../../types/admin';
import {DatetimeLocalValue} from '../../../../types/misc';
import {apiCreateMarketClosedSession} from '../../../../utils/api/account/admin';
import {getErrorMessage} from '../../../../utils/error';
import {getLocalTimezone} from '../../../../utils/time';


type State = Pick<FuturesMarketClosedSession, 'security'> & {
  start: DatetimeLocalValue | undefined,
  end: DatetimeLocalValue | undefined,
  updating: boolean,
};

const generateInitialState = (): State => {
  return {
    security: '',
    start: undefined,
    end: undefined,
    updating: false,
  };
};

type Props = {
  updateSessions: (sessions: FuturesMarketClosedSession[]) => void,
};

export const NewMarketSessionRow = ({updateSessions}: Props) => {
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const [input, setInput] = React.useState<State>(generateInitialState());
  const {security, start, end, updating} = input;

  if (!session?.user) {
    return <></>;
  }

  const onAdd = async () => {
    if (!start || !end) {
      return;
    }

    const timezone = getLocalTimezone();
    const startDate = new Date(`${start}${timezone}`);
    const endDate = new Date(`${end}${timezone}`);

    if (startDate > endDate) {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: '收盤時間必須早於開盤時間。'}));
      return;
    } else if (endDate < new Date()) {
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message: '開盤時間必須晚於現在時間。'}));
      return;
    }

    setInput({
      ...input,
      updating: true,
    });

    try {
      const updatedSessions = await apiCreateMarketClosedSession({
        token: session.user.token || '',
        security,
        start: `${start as DatetimeLocalValue}:00.000${timezone}`,
        end: `${end as DatetimeLocalValue}:59.999${timezone}`,
      });
      updateSessions(updatedSessions.data);
    } catch (err) {
      const message = getErrorMessage({err});
      dispatch(errorDispatchers[ErrorDispatcherName.UPDATE]({message}));
    }

    setInput(generateInitialState());
  };

  return (
    <tr>
      <td>
        <Form.Control
          value={security}
          onChange={({target}) => setInput({
            ...input,
            security: target.value,
          })}
        />
      </td>
      <td>
        <Form.Control
          type="datetime-local"
          value={start}
          onChange={({target}) => setInput({
            ...input,
            start: target.value as DatetimeLocalValue,
          })}
          key={(!start).toString()}
        />
      </td>
      <td>
        <Form.Control
          type="datetime-local"
          value={end}
          onChange={({target}) => setInput({
            ...input,
            end: target.value as DatetimeLocalValue,
          })}
          key={(!end).toString()}
        />
      </td>
      <td>
        <Button variant="outline-success" onClick={onAdd} disabled={!security || !start || !end || updating}>
          <i className="bi bi-plus-lg"/>
        </Button>
      </td>
    </tr>
  );
};
