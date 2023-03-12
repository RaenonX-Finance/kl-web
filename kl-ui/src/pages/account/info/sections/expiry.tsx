import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Countdown, {CountdownRendererFn} from 'react-countdown';

import {AccountInfoProps} from '../type';


export const AccountExpiry = ({user}: AccountInfoProps) => {
  if (!user.expiry) {
    return (
      <Row>
        <Col className="text-end">
          永久會員
        </Col>
      </Row>
    );
  }

  const expiry = new Date(user.expiry);

  const countdownRender: CountdownRendererFn = ({days, hours, minutes, seconds}) => {
    return `${days} 天 ${hours} 時 ${minutes} 分 ${seconds} 秒後到期 (${expiry.toLocaleString()})`;
  };

  return (
    <Row>
      <Col className="text-end">
        <Countdown
          date={expiry}
          renderer={countdownRender}
        />
      </Col>
    </Row>
  );
};
