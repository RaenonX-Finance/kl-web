import React from 'react';

import format from 'date-fns/format';
import {InfoRequest} from 'kl-web-common/models/api/info/common';
import {DateOnly} from 'kl-web-common/models/dateOnly';
import {ISODateString} from 'kl-web-common/types/time';
import {dateOnlyToString, stringToDateOnly} from 'kl-web-common/utils/date';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import styles from './main.module.scss';


type Props = {
  loading: boolean,
  date: DateOnly,
  setDate: (date: DateOnly) => void,
  fetchFunc: (request: InfoRequest) => void,
};

export const InfoRequestMaker = ({loading, date, setDate, fetchFunc}: Props) => {
  const {data} = useSession();
  const [forceScrape, setForceScrape] = React.useState(false);
  const dateString = dateOnlyToString(date);

  return (
    <InputGroup>
      <Form.Control
        type="date"
        value={dateString}
        max={format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')}
        onChange={({target}) => {
          try {
            // Test if `target.value` is a valid value
            // > Not using the formatted result because `new Date()` could make unwanted date offset
            // > because of the timezone difference
            format(new Date(target.value), 'yyyy-MM-dd');

            setDate(stringToDateOnly(target.value as ISODateString));
          } catch (e) {
            // Date string is invalid
            return;
          }
        }}
      />
      {
        data?.user.isAdmin &&
        <Button
          variant="outline-danger" active={forceScrape} disabled={loading} className={styles['force-scrape']}
          onClick={() => setForceScrape((original) => !original)}
        >
          強制更新
        </Button>
      }
      <Button variant="outline-light" disabled={loading} onClick={() => fetchFunc({...date, forceScrape})}>
        <i className="bi bi-search"/>
      </Button>
    </InputGroup>
  );
};
