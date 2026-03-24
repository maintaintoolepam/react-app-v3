import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';

describe('LoginPage (BDD)', () => {
  it('Given correct credentials, When logging in, Then user sees dashboard success message', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByText('You made it!')).toBeInTheDocument();
  });
});