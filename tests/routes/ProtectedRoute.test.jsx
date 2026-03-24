import React from 'react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import ProtectedRoute from '../../src/routes/ProtectedRoute.jsx';
import { renderWithProviders } from '../utils/render.jsx';
import { MOCK_USER } from '../../src/state/MockData.js';

describe('Protected routes (BDD)', () => {
  it('Given unauthenticated user, When visiting a protected route, Then user is redirected to login', () => {
    renderWithProviders(
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1>Protected Content</h1>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<h1>Login</h1>} />
      </Routes>,
      { route: '/dashboard' },
    );

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('Given authenticated user, When visiting a protected route, Then protected content renders', () => {
    renderWithProviders(
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1>Protected Content</h1>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<h1>Login</h1>} />
      </Routes>,
      { route: '/dashboard', auth: { initialUser: MOCK_USER } },
    );

    expect(screen.getByRole('heading', { name: 'Protected Content' })).toBeInTheDocument();
  });
});