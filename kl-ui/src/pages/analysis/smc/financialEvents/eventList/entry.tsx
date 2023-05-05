import React from 'react';

import format from 'date-fns/format';
import Accordion from 'react-bootstrap/Accordion';
import {AccordionEventKey} from 'react-bootstrap/AccordionContext';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {accordionStyles} from './const';
import {FinancialEventCountdown} from './countdown';
import {FinancialEventHistory} from './history/chart';
import {FinancialEventLastUpdate} from './lastUpdate';
import styles from './main.module.scss';
import {FinancialEventEntryProps} from './type';
import {FinancialEventValues} from './values';
import {Twemoji} from '../../../../../components/common/twemoji';
import {countryToEmoji} from '../../../../../static/countryFlag/const';
import {addSpaceBetweenAsciiAndNon} from '../../../../../utils/string';


type Props = FinancialEventEntryProps & {
  activeKey: AccordionEventKey,
  isLatest: boolean,
};

export const FinancialEventEntry = ({activeKey, entry, isLatest}: Props) => {
  const {
    id,
    symbol,
    date,
    country,
    title,
    reference,
    description,
    importance,
    lastUpdate,
  } = entry;

  const dateObj = new Date(date);
  const lastUpdateObj = new Date(lastUpdate);

  return (
    <Accordion.Item
      className={`${accordionStyles[importance]} ${isLatest ? styles['latest-item'] : ''}`}
      eventKey={id.toString()}
    >
      <Accordion.Header>
        <Row className="g-2 g-md-3 w-100">
          <Col md="auto">
            <Row className="g-2 vstack-md">
              <Col className={styles['date']} xs="auto" md={12}>
                {format(dateObj, 'MM-dd HH:mm (O)')}
              </Col>
              <Col className={styles['countdown']} xs="auto">
                <FinancialEventCountdown date={dateObj}/>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex" md>
            <span className={styles['country']}>
              <Twemoji emoji={countryToEmoji[country]}/>
            </span>
            <Row>
              <Col>
                <span className={styles['title']}>
                  {addSpaceBetweenAsciiAndNon(`${reference}${title}`)}
                </span>
                <FinancialEventLastUpdate date={lastUpdateObj}/>
              </Col>
            </Row>
          </Col>
          <Col className={`${styles['values']}`} md="auto">
            <FinancialEventValues entry={entry}/>
          </Col>
        </Row>
      </Accordion.Header>
      <Accordion.Body>
        <p>{addSpaceBetweenAsciiAndNon(description)}</p>
        <Row>
          <Col>
            <FinancialEventHistory symbol={symbol} isShown={activeKey === id.toString()}/>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};
