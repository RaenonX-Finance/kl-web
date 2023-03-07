import React from 'react';

import {LayoutIcon1of1x1} from './icon/1-1x1';
import {LayoutIcon2of1x2} from './icon/2-1x2';
import {LayoutIcon2of2x1} from './icon/2-2x1';
import {LayoutIcon3of1x3} from './icon/3-1x3';
import {LayoutIcon3of3x1} from './icon/3-3x1';
import {LayoutIcon3ofBF} from './icon/3-BF';
import {LayoutIcon3ofLF} from './icon/3-LF';
import {LayoutIcon3ofRF} from './icon/3-RF';
import {LayoutIcon3ofTF} from './icon/3-TF';
import {LayoutIcon4of1x4} from './icon/4-1x4';
import {LayoutIcon4of2x2} from './icon/4-2x2';
import {LayoutIcon4of4x1} from './icon/4-4x1';
import {LayoutIcon4ofB2} from './icon/4-B2';
import {LayoutIcon4ofBF} from './icon/4-BF';
import {LayoutIcon4ofL2} from './icon/4-L2';
import {LayoutIcon4ofLF} from './icon/4-LF';
import {LayoutIcon4ofR2} from './icon/4-R2';
import {LayoutIcon4ofRF} from './icon/4-RF';
import {LayoutIcon4ofT2} from './icon/4-T2';
import {LayoutIcon4ofTF} from './icon/4-TF';
import {ChartLayoutOptions} from './optionRow';
import {useLayout} from '../../../hooks/layout/main';


type Props = {
  onSelect: () => void,
};

export const ChartLayoutSelector = ({onSelect}: Props) => {
  const {isLandscape} = useLayout();

  return (
    <>
      <ChartLayoutOptions
        count={1}
        icons={[
          () => <LayoutIcon1of1x1 onClick={onSelect}/>,
        ]}
      />
      <ChartLayoutOptions
        count={2}
        icons={[
          () => <LayoutIcon2of1x2 onClick={onSelect}/>,
          () => <LayoutIcon2of2x1 onClick={onSelect}/>,
        ]}
      />
      {
        isLandscape &&
        <>
          <ChartLayoutOptions
            count={3}
            icons={[
              () => <LayoutIcon3of1x3 onClick={onSelect}/>,
              () => <LayoutIcon3of3x1 onClick={onSelect}/>,
              () => <LayoutIcon3ofBF onClick={onSelect}/>,
              () => <LayoutIcon3ofLF onClick={onSelect}/>,
              () => <LayoutIcon3ofRF onClick={onSelect}/>,
              () => <LayoutIcon3ofTF onClick={onSelect}/>,
            ]}
          />
          <ChartLayoutOptions
            count={4}
            icons={[
              () => <LayoutIcon4of1x4 onClick={onSelect}/>,
              () => <LayoutIcon4of2x2 onClick={onSelect}/>,
              () => <LayoutIcon4of4x1 onClick={onSelect}/>,
              () => <LayoutIcon4ofB2 onClick={onSelect}/>,
              () => <LayoutIcon4ofBF onClick={onSelect}/>,
              () => <LayoutIcon4ofL2 onClick={onSelect}/>,
              () => <LayoutIcon4ofLF onClick={onSelect}/>,
              () => <LayoutIcon4ofR2 onClick={onSelect}/>,
              () => <LayoutIcon4ofRF onClick={onSelect}/>,
              () => <LayoutIcon4ofT2 onClick={onSelect}/>,
              () => <LayoutIcon4ofTF onClick={onSelect}/>,
            ]}
          />
        </>
      }
    </>
  );
};
