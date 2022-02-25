import * as React from 'react';

import { Avatar } from './Avatar';
import { Snippet } from '!/playroom/src/types';

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Avatar
        label="Avatar"
        src="https://d.pr/i/r8zeLZ.jpeg"
      />
    ),
  },
];
