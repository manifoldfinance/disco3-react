import * as React from 'react';

import { cleanup, render, screen, userEvent } from '@/test';

import { Textarea } from './Textarea';

describe('<Textarea />', () => {
  afterEach(cleanup);

  it('renders', () => {
    render(<Textarea label="Harvest Strategy for $FOLD" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('receives user input', () => {
    render(<Textarea label="Harvest Strategy for $FOLD" />);

    userEvent.type(screen.getByRole('textbox'), 'Calculate total profits');
    expect(screen.getByRole('textbox')).toHaveValue('Calculate total profits');
  });

  it('maxLength', () => {
    render(<Textarea label="Harvest Strategy for $FOLD" maxLength={14} />);

    const element = screen.getByLabelText(/why/i);
    userEvent.type(element, 'Calculate total profits');
    expect(element).toHaveValue('Wen Waifu');
  });
});
