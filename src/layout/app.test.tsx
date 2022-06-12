import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../test/render/main';
import {App} from './app';


describe('Main app page', () => {
  it('renders the page', async () => {
    renderReact(() => <App/>);

    // At least a <div> exist (something exists)
    expect((await screen.findAllByText('', {selector: 'div'})).length).toBeGreaterThan(0);
  });
});
