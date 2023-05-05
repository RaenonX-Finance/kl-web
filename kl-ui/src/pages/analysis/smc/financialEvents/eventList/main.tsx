import React, {createRef} from 'react';

import {FinancialEventData} from 'kl-web-common/models/api/info/financialEvents';
import {InfoSocketS2CEvents} from 'kl-web-common/models/socket/events';
import Accordion from 'react-bootstrap/Accordion';
import {AccordionEventKey} from 'react-bootstrap/AccordionContext';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import {FinancialEventEntry} from './entry';
import styles from './main.module.scss';
import {InfoSocketContext} from '../../../../../hooks/socket/info/const';
import {SmcPageRenderProps} from '../../common/type';


type FinancialEventListProps = SmcPageRenderProps<FinancialEventData>;

export const FinancialEventList = ({data, date, setData}: FinancialEventListProps) => {
  const infoSocket = React.useContext(InfoSocketContext);

  const [latestIds, setLatestIds] = React.useState<number[]>([]);

  const entryRefs = React.useRef<{[id in number]: React.RefObject<HTMLDivElement>}>({});
  // Recording `activeKey` so the according body can be lazily rendered
  const [activeKey, setActiveKey] = React.useState<AccordionEventKey>(null);

  const onLatestUpdated: InfoSocketS2CEvents['latestUpdated'] = React.useCallback((data) => {
    const latestRecord = Object.fromEntries(data.map((data) => [data.id, data]));

    setData((status) => ({
      ...status,
      data: status.data.map((entry) => entry.id in latestRecord ? latestRecord[entry.id] : entry),
    }));
    setLatestIds(data.map(({id}) => id));
  }, []);
  const onEventUpdated: InfoSocketS2CEvents['eventUpdated'] = React.useCallback((data) => {
    setData((status) => ({...status, data}));
  }, []);

  // --- Hooks
  // Socket event
  React.useEffect(() => {
    if (!infoSocket) {
      throw new Error('Info socket uninitialized while loading financial event list');
    }

    infoSocket.on('latestUpdated', onLatestUpdated);
    infoSocket.on('eventUpdated', onEventUpdated);

    return () => {
      infoSocket.off('latestUpdated', onLatestUpdated);
      infoSocket.off('eventUpdated', onEventUpdated);
    };
  }, []);

  React.useEffect(() => {
    if (!infoSocket) {
      throw new Error('Info socket uninitialized while attempting to subscribe data');
    }

    infoSocket.emit('subscribe', date);
  }, [date]);

  // Scroll to current
  React.useEffect(() => {
    scrollToCurrent();
  }, [!!entryRefs.current]);

  const dataToShow = data.filter(({importance, allDayEvent}) => importance !== 'low' && !allDayEvent);

  const scrollToCurrent = () => {
    const next = dataToShow.find(({date}) => new Date() < new Date(date));

    if (!next) {
      return;
    }

    entryRefs.current[next.id]?.current?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  };

  if (!dataToShow.length) {
    return (
      <Alert variant="danger">
        無財經事件可供顯示。
      </Alert>
    );
  }

  entryRefs.current = Object.fromEntries(dataToShow.map(({id}) => [id, entryRefs.current[id] ?? createRef()]));

  return (
    <>
      <Accordion flush onSelect={(eventKey) => setActiveKey(eventKey)}>
        {dataToShow.map((entry) => (
          <div key={entry.id} ref={entryRefs.current[entry.id]}>
            <FinancialEventEntry
              key={entry.id}
              entry={entry}
              activeKey={activeKey}
              isLatest={latestIds.includes(entry.id)}
            />
          </div>
        ))}
      </Accordion>
      <Button className={styles['to-current']} onClick={scrollToCurrent}>
        <i className="bi bi-clock"/>
      </Button>
    </>
  );
};
