import * as React from 'react';

import { AvatarGroup } from './AvatarGroup';
import { Snippet } from '!/playroom/src/types';

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
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
      />
    ),
  },
];
