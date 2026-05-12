import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TurboUIProvider } from './TurboUIProvider';

describe('TurboUIProvider', () => {
  it('renders children without extra wrapper when no theme and no scope', () => {
    const { container } = render(
      <TurboUIProvider>
        <span data-testid="child">x</span>
      </TurboUIProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(container.querySelector('div')).toBeNull();
  });

  it('wraps with div and applies theme as inline style', () => {
    const { container } = render(
      <TurboUIProvider theme={{ '--content-primary': '#112233' }}>
        <span>inside</span>
      </TurboUIProvider>
    );
    const wrap = container.firstElementChild as HTMLElement;
    expect(wrap.tagName).toBe('DIV');
    expect(wrap.style.getPropertyValue('--content-primary')).toBe('#112233');
  });

  it('renders scope class when scopeClassName is set', () => {
    const { container } = render(
      <TurboUIProvider scopeClassName="my-scope">
        <span data-testid="c">y</span>
      </TurboUIProvider>
    );
    const wrap = container.firstElementChild as HTMLElement;
    expect(wrap).toHaveClass('my-scope');
    expect(screen.getByTestId('c')).toBeInTheDocument();
  });

  it('combines scopeClassName and theme', () => {
    const { container } = render(
      <TurboUIProvider scopeClassName="scoped" theme={{ '--content-brand': '#00aa00' }}>
        <span>z</span>
      </TurboUIProvider>
    );
    const wrap = container.firstElementChild as HTMLElement;
    expect(wrap).toHaveClass('scoped');
    expect(wrap.style.getPropertyValue('--content-brand')).toBe('#00aa00');
  });
});
