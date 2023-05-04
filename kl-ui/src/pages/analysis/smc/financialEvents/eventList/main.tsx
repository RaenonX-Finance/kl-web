import React, {createRef} from 'react';

import {FinancialEventData} from 'kl-web-common/models/api/info/financialEvents';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import {FinancialEventEntry} from './entry';
import styles from './main.module.scss';


type FinancialEventListProps = {
  data: FinancialEventData,
};

export const FinancialEventList = ({data}: FinancialEventListProps) => {
  const entryRefs = React.useRef<{[id in number]: React.RefObject<HTMLDivElement>}>({});
  const dataToShow = data.filter(({importance, allDayEvent}) => importance !== 'low' && !allDayEvent);

  const scrollToCurrent = () => {
    const next = dataToShow.find(({date}) => new Date() < new Date(date));

    if (!next) {
      return;
    }

    console.log(entryRefs.current);
    entryRefs.current[next.id]?.current?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    scrollToCurrent();
  }, [!!entryRefs.current]);

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
      <Accordion flush>
        {dataToShow.map((entry) => (
          <div key={entry.id} ref={entryRefs.current[entry.id]}>
            <FinancialEventEntry key={entry.id} entry={entry}/>
          </div>
        ))}
      </Accordion>
      <Button className={styles['to-current']} onClick={scrollToCurrent}>
        <i className="bi bi-clock"/>
      </Button>
    </>
  );
};
