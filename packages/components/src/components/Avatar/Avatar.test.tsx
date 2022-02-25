import * as React from 'react';

import { cleanup, render, screen } from '@/test';

import { Avatar } from './Avatar';

describe('<Avatar />', () => {
  afterEach(cleanup);

  it('renders', () => {
    render(
      <Avatar
        label="Avatar"
        src="https://d.pr/i/r8zeLZ.jpeg"
      />,
    );
    expect(screen.getByRole(/img/i)).toBeInTheDocument();
  });
});
