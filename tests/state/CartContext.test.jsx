import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../src/state/CartContext.jsx';

function wrapper({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

describe('CartContext (BDD)', () => {
  it('Given empty cart, When adding items, Then count increments correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.count).toBe(0);

    act(() => result.current.addItem());
    expect(result.current.count).toBe(1);

    act(() => result.current.addItem());
    expect(result.current.count).toBe(2);
  });

  it('Given cart with items, When resetting, Then count returns to zero', () => {
    const customWrapper = ({ children }) => (
      <CartProvider initialCount={5}>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper: customWrapper });

    expect(result.current.count).toBe(5);

    act(() => result.current.reset());
    expect(result.current.count).toBe(0);
  });
});