import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';
import { MOCK_USER } from '../../src/state/MockData.js';

describe('DashboardPage (BDD)', () => {
  it('Given authenticated user, When visiting /dashboard, Then dashboard heading and hint are shown', () => {
    renderWithProviders(<App />, { route: '/dashboard', auth: { initialUser: MOCK_USER } });

    const heading = screen.getByRole('heading', { name: /dashboard/i, level: 2 });
    expect(heading).toBeInTheDocument();

    const card = heading.closest('.card') ?? heading.parentElement;
    expect(within(card).getByText(/you made it!/i)).toBeInTheDocument();
    expect(within(card).getByText(/use the category buttons in the header\./i)).toBeInTheDocument();
  });
});