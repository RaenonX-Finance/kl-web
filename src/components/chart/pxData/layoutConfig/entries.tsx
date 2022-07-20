import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {defaultConfig} from '../../../../state/config/const';
import {getConfig} from '../../../../state/config/utils';
import {FloatingInput} from '../../../common/form/floating/input';
import {PxChartLayoutConfigKeys, PxChartLayoutConfigSingle} from '../type';
import {configKeysToHideOfSecurity} from './const';
import {LayoutConfigPanelProps} from './main';
import styles from './main.module.scss';
import {LayoutConfigEntriesGroup} from './type';


type Props = Pick<LayoutConfigPanelProps, 'security' | 'config'> & {
  configEntriesGroup: LayoutConfigEntriesGroup,
  updateConfig: (
    configKey: PxChartLayoutConfigKeys,
    value: PxChartLayoutConfigSingle[PxChartLayoutConfigKeys]
  ) => void,
  updating: boolean,
};

export const PxChartLayoutConfigEntries = ({
  security,
  config,
  configEntriesGroup,
  updateConfig,
  updating,
}: Props) => {
  const configKeysToHide = configKeysToHideOfSecurity[security] || [];

  return (
    <Form>
      {Object.entries(configEntriesGroup).map(([groupName, entryObj]) => (
        <React.Fragment key={groupName}>
          <h5 className="mb-3">{groupName}</h5>
          {Object.entries(entryObj).map(([key, entry]) => {
            const configKey = key as PxChartLayoutConfigKeys;

            if (configKeysToHide.includes(configKey)) {
              return <React.Fragment key={key}/>;
            }

            const {title, isDisabled, min, step, tips} = entry;
            const value = getConfig(config, configKey);
            const disabled = updating || (isDisabled && isDisabled(config));

            if (typeof value === 'boolean') {
              return (
                <Button
                  key={key}
                  className={`w-100 mb-3 bg-gradient ${styles['config-button']}`}
                  variant="outline-mild-info"
                  onClick={() => updateConfig(configKey, !value)}
                  disabled={disabled}
                  active={value}
                >
                  {title}
                  {tips && <><br/><small>{tips}</small></>}
                </Button>
              );
            }

            return (
              <FloatingInput
                key={key}
                type="number"
                label={title}
                value={value}
                onChange={({target}) => updateConfig(
                  configKey,
                  (target.value === '' || target.value === '0') ?
                    (min || defaultConfig[configKey]) :
                    parseFloat(target.value),
                )}
                className="w-100 mb-3"
                disabled={disabled}
                min={min}
                step={step}
                description={tips}
              />
            );
          })}
        </React.Fragment>
      ))}
    </Form>
  );
};
