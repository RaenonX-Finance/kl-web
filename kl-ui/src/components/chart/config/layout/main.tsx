import React from 'react';

import {useSession} from 'next-auth/react';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {PxChartLayoutConfigEntries} from './entries';
import styles from './main.module.scss';
import {PxLayoutConfigSingle} from './type';
import {PxChartLayoutConfigUpdating} from './updating';
import {LayoutConfigUpdatePayload} from '../../../../state/config/type';
import {PxSlotName} from '../../../../types/pxData';


export type LayoutConfigPanelProps = {
  security: string,
  title: string,
  slot: PxSlotName,
  config: PxLayoutConfigSingle,
  setConfig: (payload: LayoutConfigUpdatePayload) => Promise<void>,
  show: boolean,
  setShow: (show: boolean) => void,
};

export const PxLayoutConfigPanel = ({
  security,
  title,
  slot,
  config,
  setConfig,
  show,
  setShow,
}: LayoutConfigPanelProps) => {
  const {data: session} = useSession();
  const [updating, setUpdating] = React.useState(false);

  return (
    <Offcanvas className={styles['config-panel']} show={show} onHide={() => setShow(false)} placement="end">
      <div className="mb-0"/>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {`模式設定 (${title})`}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <hr className="my-0"/>
      <Offcanvas.Body>
        {updating && <PxChartLayoutConfigUpdating/>}
        <PxChartLayoutConfigEntries
          security={security}
          config={config}
          updating={updating}
          updateConfig={(configKey, value) => {
            setUpdating(true);
            setConfig({
              token: session?.user?.token,
              slot,
              configKey,
              value,
            }).finally(() => setUpdating(false));
          }}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};
