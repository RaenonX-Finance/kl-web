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
import {LayoutType} from './type';


export const layoutIcon: {[icon in LayoutType]: React.ReactNode} = {
  '1-1x1': <LayoutIcon1of1x1/>,
  '2-2x1': <LayoutIcon2of2x1/>,
  '2-1x2': <LayoutIcon2of1x2/>,
  '3-3x1': <LayoutIcon3of3x1/>,
  '3-1x3': <LayoutIcon3of1x3/>,
  '3-LF': <LayoutIcon3ofLF/>,
  '3-RF': <LayoutIcon3ofRF/>,
  '3-TF': <LayoutIcon3ofTF/>,
  '3-BF': <LayoutIcon3ofBF/>,
  '4-2x2': <LayoutIcon4of2x2/>,
  '4-4x1': <LayoutIcon4of4x1/>,
  '4-1x4': <LayoutIcon4of1x4/>,
  '4-LF': <LayoutIcon4ofLF/>,
  '4-RF': <LayoutIcon4ofRF/>,
  '4-TF': <LayoutIcon4ofTF/>,
  '4-BF': <LayoutIcon4ofBF/>,
  '4-L2': <LayoutIcon4ofL2/>,
  '4-R2': <LayoutIcon4ofR2/>,
  '4-T2': <LayoutIcon4ofT2/>,
  '4-B2': <LayoutIcon4ofB2/>,
};
