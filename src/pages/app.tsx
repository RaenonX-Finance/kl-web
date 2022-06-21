import React from 'react';

import {Provider} from 'react-alert';
import Container from 'react-bootstrap/Container';

import {PopupAlert} from '../components/alert/main';
import {useLayout} from '../hooks/layout/main';
import {PxDataMain} from './pxData/main';


export const App = () => {
  const {isLandscape} = useLayout();

  return (
    <Provider template={PopupAlert} timeout={3000} position="bottom center">
      <Container fluid={isLandscape}>
        <PxDataMain/>
      </Container>
    </Provider>
  );
};
