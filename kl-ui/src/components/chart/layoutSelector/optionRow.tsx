import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from './main.module.scss';


type Props = {
  count: number,
  icons: (() => React.ReactNode)[],
};

export const ChartLayoutOptions = React.memo(({count, icons}: Props) => {
  return (
    <Row className="g-2">
      <Col xs="auto" className="align-self-center">
        <span className={styles['layout-option-count']}>{count}</span>
      </Col>
      <Col>
        {icons.map((icon, idx) => (
          <React.Fragment key={idx}>{icon()}</React.Fragment>
        ))}
      </Col>
    </Row>
  );
});

ChartLayoutOptions.displayName = 'ChartLayoutOptions';
