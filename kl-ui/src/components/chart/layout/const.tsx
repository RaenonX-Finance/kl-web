import React from 'react';

import {Layout1of1x1} from './1-1x1';
import {Layout2of1x2} from './2-1x2';
import {Layout2of2x1} from './2-2x1';
import {Layout3of1x3} from './3-1x3';
import {Layout3of3x1} from './3-3x1';
import {Layout3ofBF} from './3-BF';
import {Layout3ofLF} from './3-LF';
import {Layout3ofRF} from './3-RF';
import {Layout3ofTF} from './3-TF';
import {Layout4of1x4} from './4-1x4';
import {Layout4of2x2} from './4-2x2';
import {Layout4of4x1} from './4-4x1';
import {Layout4ofB2} from './4-B2';
import {Layout4ofBF} from './4-BF';
import {Layout4ofL2} from './4-L2';
import {Layout4ofLF} from './4-LF';
import {Layout4ofR2} from './4-R2';
import {Layout4ofRF} from './4-RF';
import {Layout4ofT2} from './4-T2';
import {Layout4ofTF} from './4-TF';
import {LayoutProps} from './type';
import {LayoutType} from '../layoutSelector/type';


export const pxDataLayout: {[type in LayoutType]: React.FunctionComponent<LayoutProps>} = {
  '1-1x1': Layout1of1x1,
  '2-2x1': Layout2of2x1,
  '2-1x2': Layout2of1x2,
  '3-3x1': Layout3of3x1,
  '3-1x3': Layout3of1x3,
  '3-LF': Layout3ofLF,
  '3-RF': Layout3ofRF,
  '3-TF': Layout3ofTF,
  '3-BF': Layout3ofBF,
  '4-2x2': Layout4of2x2,
  '4-4x1': Layout4of4x1,
  '4-1x4': Layout4of1x4,
  '4-LF': Layout4ofLF,
  '4-RF': Layout4ofRF,
  '4-TF': Layout4ofTF,
  '4-BF': Layout4ofBF,
  '4-L2': Layout4ofL2,
  '4-R2': Layout4ofR2,
  '4-T2': Layout4ofT2,
  '4-B2': Layout4ofB2,
};
