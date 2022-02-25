import * as React from 'react';

import { cleanup, render, screen } from '@/test';

import { AvatarGroup } from './AvatarGroup';

describe('<AvatarGroup />', () => {
  afterEach(cleanup);

  it('renders', () => {
    render(
      <AvatarGroup
        members={[
          {
            label: 'mfer bastard punkz',
            src: 'https://d.pr/i/r8zeLZ.jpeg',
          },
          {
            label: 'BestBastard Punk',
            src: 'https://d.pr/i/GrqCju.jpeg',
          },
          {
            label: 'Bastard Punk',
            src: 'https://d.pr/i/GrqCju.jpeg',
          },
        ]}
      />,
    );
    expect(screen.getAllByRole(/img/i).length).toBe(3);
  });
});
