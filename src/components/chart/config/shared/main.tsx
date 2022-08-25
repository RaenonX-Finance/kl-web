import React from 'react';

import {useSession} from 'next-auth/react';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

import {configDispatchers} from '../../../../state/config/dispatchers';
import {useSharedConfigSelector} from '../../../../state/config/selector';
import {ConfigDispatcherName} from '../../../../state/config/type';
import {useDispatch} from '../../../../state/store';
import styles from './main.module.scss';
import {PxChartSharedConfigTabs} from './tabs';


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
      <Dropdown.Item onClick={openModal}>
        版面設定
      </Dropdown.Item>
      <Modal show={show} size="lg" onHide={closeModal} centered>
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
