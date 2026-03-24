import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Sidebar from '../../src/components/Sidebar.jsx';
import { renderWithProviders } from '../utils/render.jsx';
import { MOCK_USER } from '../../src/state/MockData.js';

describe('Sidebar (BDD)', () => {
  it('Given authenticated user, When sidebar renders, Then navigation and logout exist', () => {
    renderWithProviders(<Sidebar />, { route: '/dashboard', auth: { initialUser: MOCK_USER } });

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Orders' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('Given dashboard route, When sidebar renders, Then dashboard link is current', () => {
    renderWithProviders(<Sidebar />, { route: '/dashboard', auth: { initialUser: MOCK_USER } });

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
  });

  it('Given profile route, When sidebar renders, Then profile link is current', () => {
    renderWithProviders(<Sidebar />, { route: '/profile', auth: { initialUser: MOCK_USER } });

    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'page');
  });
});