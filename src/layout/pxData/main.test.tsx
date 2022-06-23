import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../test/render/main';
import {PxDataMain} from './main';


describe('Main chart page', () => {
  it('renders', async () => {
    renderReact(() => <PxDataMain/>);

    // At least a <div> exist (something exists)
    expect((await screen.findAllByText('', {selector: 'div'})).length).toBeGreaterThan(0);
  });
});
