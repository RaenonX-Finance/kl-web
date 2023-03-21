import React from 'react';

import format from 'date-fns/format';
import {ISODateString} from 'kl-web-common/types/time';
import {dateOnlyToString, stringToDateOnly, toDateOnly} from 'kl-web-common/utils/date';
import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import styles from './main.module.scss';
import {OptionsOiRequestParams} from './type';


type Props = {
  loading: boolean,
  fetchOptionsOi: (request: OptionsOiRequestParams) => void
};

export const OptionsOiRequestMaker = ({loading, fetchOptionsOi}: Props) => {
  const {data} = useSession();
  const [request, setRequest] = React.useState<OptionsOiRequestParams>({
    ...toDateOnly(new Date()),
    forceScrape: false,
  });
  const {forceScrape} = request;
  const dateString = dateOnlyToString(request);

  return (
    <InputGroup>
      <Form.Control
        type="date"
        value={dateString}
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
      <Button variant="outline-light" disabled={loading} onClick={() => fetchOptionsOi(request)}>
        <i className="bi bi-search"/>
      </Button>
    </InputGroup>
  );
};
