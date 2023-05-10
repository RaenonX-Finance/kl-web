import React from 'react';

import format from 'date-fns/format';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

import {accordionStyles} from './const';
import {FinancialEventCountdown} from './countdown';
import styles from './main.module.scss';
import {FinancialEventEntryProps} from './type';
import {FinancialEventValues} from './values';
import {Twemoji} from '../../../../../components/common/twemoji';
import {countryToEmoji} from '../../../../../static/countryFlag/const';
import {addSpaceBetweenAsciiAndNon} from '../../../../../utils/string';


type Props = FinancialEventEntryProps & {
  isLatest: boolean,
};

export const FinancialEventEntry = React.forwardRef<HTMLAnchorElement, Props>((
  {entry, isLatest},
  ref,
) => {
  const {
    date,
    country,
    title,
    reference,
    importance,
  } = entry;

  const dateObj = new Date(date);

  return (
    <ListGroup.Item
      className={`${accordionStyles[importance]} ${isLatest ? styles['latest-item'] : ''}`}
      ref={ref}
    >
      <Row className="g-2 g-md-3">
        <Col className="d-flex align-self-center" md="auto">
          <Row className="g-2 vstack-md">
            <Col className={styles['date']} xs="auto" md={12}>
              {format(dateObj, 'MM-dd HH:mm')}
            </Col>
            <Col className={styles['countdown']} xs="auto">
              <FinancialEventCountdown date={dateObj}/>
            </Col>
          </Row>
        </Col>
        <Col className="d-flex align-items-center" md>
          <span className={styles['country']}>
            <Twemoji emoji={countryToEmoji[country]}/>
          </span>
          <span className={styles['title']}>
            {addSpaceBetweenAsciiAndNon(`${reference}${title}`)}
          </span>
        </Col>
        <Col className={`${styles['values']}`}>
          <FinancialEventValues entry={entry}/>
        </Col>
      </Row>
    </ListGroup.Item>
  );
});

FinancialEventEntry.displayName = 'FinancialEventEntry';
