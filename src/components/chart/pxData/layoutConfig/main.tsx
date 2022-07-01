import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {LayoutConfigUpdatePayload, PxChartLayoutConfigState} from '../../../../state/config/types';
import {PxDataMapSlotNames} from '../../../../types/pxData';
import {configEntriesUI} from '../config';
import {PxChartLayoutConfigEntry, PxChartLayoutConfigKeys} from '../type';


type Props = {
  title: string,
  slot: PxDataMapSlotNames,
  config: PxChartLayoutConfigState,
  setConfig: (payload: LayoutConfigUpdatePayload) => void,
};

export const PxChartLayoutConfigPanel = ({title, slot, config, setConfig}: Props) => {
  const [show, setShow] = React.useState(false);

  const configEntriesUiGroup: {[group in string]: {[key in PxChartLayoutConfigKeys]: PxChartLayoutConfigEntry}} = {};
  Object.entries(configEntriesUI).forEach(([key, entry]) => {
    configEntriesUiGroup[entry.group] = {
      ...(configEntriesUiGroup[entry.group] || {}),
      [key]: entry,
    };
  });

  return (
    <>
      <Button size="sm" variant="outline-info" className="me-2" onClick={() => setShow(true)}>
        版面設定
      </Button>
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end" style={{width: '18rem'}}>
        <div className="mb-0"/>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {`版面設定 (${title})`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr className="my-0"/>
        <Offcanvas.Body>
          <Form>
            {Object.entries(configEntriesUiGroup)
              .map(([groupName, entryObj]) => (
                <React.Fragment key={groupName}>
                  <h5>{groupName}</h5>
                  {Object.entries(entryObj).map(([key, entry]) => {
                    const configKey = key as PxChartLayoutConfigKeys;
                    const {title, isDisabled} = entry;
                    const enable = config[configKey];

                    return (
                      <Button
                        className="w-100 mb-3 bg-gradient"
                        key={key}
                        variant="outline-info"
                        onClick={() => setConfig({
                          slot,
                          configKey,
                          value: !enable,
                        })}
                        disabled={isDisabled ? isDisabled(config) : false}
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
