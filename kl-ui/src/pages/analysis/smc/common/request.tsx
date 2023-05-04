import React from 'react';

import format from 'date-fns/format';
import {InfoRequest} from 'kl-web-common/models/api/info/common';
import {ISODateString} from 'kl-web-common/types/time';
import {dateOnlyToString, stringToDateOnly, toDateOnly} from 'kl-web-common/utils/date';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import styles from './main.module.scss';


type Props<T extends InfoRequest> = {
  loading: boolean,
  fetchFunc: (request: T) => void
};

export const InfoRequestMaker = <T extends InfoRequest>({loading, fetchFunc}: Props<T>) => {
  const {data} = useSession();
  const [request, setRequest] = React.useState<T>({
    ...toDateOnly(new Date()),
    forceScrape: false,
  } as T);
  const {forceScrape} = request;
  const dateString = dateOnlyToString(request);

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

            setRequest({...request, ...stringToDateOnly(target.value as ISODateString)});
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
          onClick={() => setRequest({...request, forceScrape: !forceScrape})}
        >
          強制更新
        </Button>
      }
      <Button variant="outline-light" disabled={loading} onClick={() => fetchFunc(request)}>
        <i className="bi bi-search"/>
      </Button>
    </InputGroup>
  );
};
