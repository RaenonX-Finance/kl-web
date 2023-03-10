import React from 'react';

import {useSession} from 'next-auth/react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';

import styles from './main.module.scss';
import {PxChartSharedConfigTabs} from './tabs';
import {configDispatchers} from '../../../../state/config/dispatchers';
import {useSharedConfigSelector} from '../../../../state/config/selector';
import {ConfigDispatcherName} from '../../../../state/config/type';
import {useDispatch} from '../../../../state/store';
import navStyles from '../../../nav/main.module.scss';


export const PxChartSharedConfig = () => {
  const config = useSharedConfigSelector();
  const dispatch = useDispatch();
  const {data} = useSession();
  const [configLocal, setConfigLocal] = React.useState(config);
  const [updating, setUpdating] = React.useState(false);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setConfigLocal(config);
  }, [config]);
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!configLocal) {
        return;
      }

      setUpdating(true);
      dispatch(configDispatchers[ConfigDispatcherName.UPDATE_SHARED_CONFIG]({
        token: data?.user?.token,
        updated: configLocal,
      })).then(() => setUpdating(false));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [configLocal]);

  if (!config || !configLocal) {
    return <></>;
  }

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
            configLocal={configLocal}
            setConfigLocal={setConfigLocal}
            closeModal={closeModal}
            updating={updating}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
