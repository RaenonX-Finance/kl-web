import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {LayoutConfigPanelProps} from './main';
import styles from './main.module.scss';
import {PxLayoutConfigKeys, PxLayoutConfigSingle} from './type';
import {getLayoutConfig} from '../../../../state/config/utils';
import {groupedLayoutConfigEntries} from '../const';


type Props = Pick<LayoutConfigPanelProps, 'config'> & {
  updateConfig: (
    configKey: PxLayoutConfigKeys,
    value: PxLayoutConfigSingle[PxLayoutConfigKeys]
  ) => void,
  updating: boolean,
};

export const PxChartLayoutConfigEntries = ({
  config,
  updateConfig,
  updating,
}: Props) => {
  const {data} = useSession();

  return (
    <Form>
      {Object.entries(groupedLayoutConfigEntries).map(([groupName, entryObj]) => (
        <React.Fragment key={groupName}>
          <h5 className="mb-3">{groupName}</h5>
          {Object.entries(entryObj).map(([key, entry]) => {
            const configKey = key as PxLayoutConfigKeys;

            const {title, isDisabled, tips} = entry;

            const value = getLayoutConfig(config, configKey);
            const disabled = updating || (isDisabled && isDisabled(config));

            return (
              <Button
                key={key}
                className={`w-100 mb-3 bg-gradient ${styles['config-button']}`}
                variant="secondary"
                onClick={() => updateConfig(configKey, !value)}
                disabled={disabled}
                active={value}
              >
                {title}
                {tips && <><br/><small>{tips}</small></>}
              </Button>
            );
          })}
        </React.Fragment>
      ))}
    </Form>
  );
};
