import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {LayoutConfigUpdatePayload, PxChartLayoutConfigSingle} from '../../../../state/config/types';
import {PxSlotName} from '../../../../types/pxData';
import {configEntriesUI} from '../config';
import {PxChartLayoutConfigEntry, PxChartLayoutConfigKeys} from '../type';
import {configKeysToHideOfSecurity} from './const';
import styles from './main.module.scss';
import {PxChartLayoutConfigUpdating} from './updating';


type Props = {
  security: string,
  title: string,
  slot: PxSlotName,
  config: PxChartLayoutConfigSingle,
  setConfig: (payload: LayoutConfigUpdatePayload) => Promise<void>,
};

export const PxChartLayoutConfigPanel = ({security, title, slot, config, setConfig}: Props) => {
  const {data: session} = useSession();
  const [show, setShow] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const configKeysToHide = configKeysToHideOfSecurity[security] || [];

  const configEntriesUiGroup: {[group in string]: {[key in PxChartLayoutConfigKeys]: PxChartLayoutConfigEntry}} = {};
  Object.entries(configEntriesUI).forEach(([key, entry]) => {
    configEntriesUiGroup[entry.group] = {
      ...(configEntriesUiGroup[entry.group] || {}),
      [key]: entry,
    };
  });

  const updateConfig = (configKey: PxChartLayoutConfigKeys) => () => {
    setUpdating(true);
    setConfig({
      token: session?.user?.token,
      slot,
      configKey,
      value: !config[configKey],
    }).finally(() => setUpdating(false));
  };

  return (
    <>
      <Button size="sm" variant="outline-info" className="me-2" onClick={() => setShow(true)}>
        版面設定
      </Button>
      <Offcanvas className={styles['config-panel']} show={show} onHide={() => setShow(false)} placement="end">
        <div className="mb-0"/>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {`版面設定 (${title})`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr className="my-0"/>
        <Offcanvas.Body>
          {updating && <PxChartLayoutConfigUpdating/>}
          <Form>
            {Object.entries(configEntriesUiGroup).map(([groupName, entryObj]) => (
              <React.Fragment key={groupName}>
                <h5 className="mb-3">{groupName}</h5>
                {Object.entries(entryObj).map(([key, entry]) => {
                  const configKey = key as PxChartLayoutConfigKeys;

                  if (configKeysToHide.includes(configKey)) {
                    return <React.Fragment key={key}/>;
                  }

                  const {title, isDisabled} = entry;
                  const enable = config[configKey];

                  return (
                    <Button
                      className={`w-100 mb-3 bg-gradient ${styles['config-button']}`}
                      key={key}
                      variant="outline-mild-info"
                      onClick={updateConfig(configKey)}
                      disabled={isDisabled && isDisabled(config)}
                      active={enable}
                    >
                      {title}
                    </Button>
                  );
                })}
              </React.Fragment>
            ))
            }
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
