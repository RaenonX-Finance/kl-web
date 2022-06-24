import React from 'react';

import {PxDataMap} from '../../../types/pxData';
import {LayoutType} from '../layoutSelector/type';
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


export const pxDataLayout: {[type in LayoutType]: (pxDataMap: PxDataMap) => React.ReactNode} = {
  '1-1x1': (pxDataMap) => <Layout1of1x1 pxDataMap={pxDataMap}/>,
  '2-2x1': (pxDataMap) => <Layout2of2x1 pxDataMap={pxDataMap}/>,
  '2-1x2': (pxDataMap) => <Layout2of1x2 pxDataMap={pxDataMap}/>,
  '3-3x1': (pxDataMap) => <Layout3of3x1 pxDataMap={pxDataMap}/>,
  '3-1x3': (pxDataMap) => <Layout3of1x3 pxDataMap={pxDataMap}/>,
  '3-LF': (pxDataMap) => <Layout3ofLF pxDataMap={pxDataMap}/>,
  '3-RF': (pxDataMap) => <Layout3ofRF pxDataMap={pxDataMap}/>,
  '3-TF': (pxDataMap) => <Layout3ofTF pxDataMap={pxDataMap}/>,
  '3-BF': (pxDataMap) => <Layout3ofBF pxDataMap={pxDataMap}/>,
  '4-2x2': (pxDataMap) => <Layout4of2x2 pxDataMap={pxDataMap}/>,
  '4-4x1': (pxDataMap) => <Layout4of4x1 pxDataMap={pxDataMap}/>,
  '4-1x4': (pxDataMap) => <Layout4of1x4 pxDataMap={pxDataMap}/>,
  '4-LF': (pxDataMap) => <Layout4ofLF pxDataMap={pxDataMap}/>,
  '4-RF': (pxDataMap) => <Layout4ofRF pxDataMap={pxDataMap}/>,
  '4-TF': (pxDataMap) => <Layout4ofTF pxDataMap={pxDataMap}/>,
  '4-BF': (pxDataMap) => <Layout4ofBF pxDataMap={pxDataMap}/>,
  '4-L2': (pxDataMap) => <Layout4ofL2 pxDataMap={pxDataMap}/>,
  '4-R2': (pxDataMap) => <Layout4ofR2 pxDataMap={pxDataMap}/>,
  '4-T2': (pxDataMap) => <Layout4ofT2 pxDataMap={pxDataMap}/>,
  '4-B2': (pxDataMap) => <Layout4ofB2 pxDataMap={pxDataMap}/>,
};
