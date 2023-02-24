import React from 'react';

import {screen} from '@testing-library/react';

import {PxDataMain} from './main';
import {renderReact} from '../../../test/render/main';


describe('Main chart page', () => {
  it('renders', async () => {
    renderReact(() => <PxDataMain/>);

    // At least a <div> exist (something exists)
    expect((await screen.findAllByText('', {selector: 'div'})).length).toBeGreaterThan(0);
  });
});
