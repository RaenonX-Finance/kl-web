import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';

import styles from './main.module.scss';
import {PxChartSharedConfigTabs} from './tabs';
import navStyles from '../../../nav/main.module.scss';


export const PxChartSharedConfig = () => {
  const [show, setShow] = React.useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Nav.Link className={navStyles['nav-item']} onClick={openModal}>
        版面設定
      </Nav.Link>
      {/* Setting z-index because navbar canvas in portrait could overlap the config modal */}
      <Modal show={show} size="lg" onHide={closeModal} centered style={{zIndex: 2000}}>
        <Modal.Header closeButton>
          <Modal.Title>版面相關設定</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles['popup-body']}>
          <PxChartSharedConfigTabs
            closeModal={closeModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
