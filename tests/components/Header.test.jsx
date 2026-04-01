import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../src/components/Header.jsx';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';
import { MOCK_USER } from '../../src/state/MockData.js';

describe('Header (BDD)', () => {
  it('Given authenticated user, When header renders, Then welcome text and badges are visible', () => {
    renderWithProviders(<Header />, { auth: { initialUser: MOCK_USER }, cart: { initialCount: 3 } });

    expect(screen.getByText('Welcome, admin!')).toBeInTheDocument();
    expect(screen.getByLabelText('3 notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('3 cart items')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // Validate visible count matches aria-label
  });

  it('Given authenticated user on dashboard, When clicking a category button, Then that category page renders', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/dashboard', auth: { initialUser: MOCK_USER }, cart: { initialCount: 0 } });

    expect(screen.getByLabelText('0 cart items')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Accessories' }));

    expect(await screen.findByRole('heading', { name: 'Accessories' })).toBeInTheDocument();
    expect(screen.getByText('Welcome to Accessories section.')).toBeInTheDocument();
  });
});