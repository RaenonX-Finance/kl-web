import React, {createRef} from 'react';

import {FinancialEventData} from 'kl-web-common/models/api/info/financialEvents';
import Accordion from 'react-bootstrap/Accordion';
import {AccordionEventKey} from 'react-bootstrap/AccordionContext';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import {FinancialEventEntry} from './entry';
import styles from './main.module.scss';


type FinancialEventListProps = {
  data: FinancialEventData,
};

export const FinancialEventList = ({data}: FinancialEventListProps) => {
  const dataToShow = data.filter(({importance, allDayEvent}) => importance !== 'low' && !allDayEvent);
  const entryRefs = React.useRef<{[id in number]: React.RefObject<HTMLDivElement>}>({});

  React.useEffect(() => {
    scrollToCurrent();
  }, [!!entryRefs.current]);
  // Recording `activeKey` so the according body can be lazily rendered
  const [activeKey, setActiveKey] = React.useState<AccordionEventKey>(null);

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
            <FinancialEventEntry key={entry.id} entry={entry} activeKey={activeKey}/>
          </div>
        ))}
      </Accordion>
      <Button className={styles['to-current']} onClick={scrollToCurrent}>
        <i className="bi bi-clock"/>
      </Button>
    </>
  );
};
