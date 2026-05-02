import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with aria-label', () => {
    render(<Checkbox aria-label="Тест" />);
    expect(screen.getByRole('checkbox', { name: 'Тест' })).toBeInTheDocument();
  });

  it('applies disabled', () => {
    render(<Checkbox aria-label="Off" disabled />);
    expect(screen.getByRole('checkbox', { name: 'Off' })).toBeDisabled();
  });

  it('applies error and aria-invalid', () => {
    render(<Checkbox aria-label="Err" error />);
    expect(screen.getByRole('checkbox', { name: 'Err' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets indeterminate on DOM input', () => {
    render(<Checkbox aria-label="Ind" indeterminate />);
    const input = screen.getByRole('checkbox', { name: 'Ind' }) as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it('forwards ref to input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('checkbox');
  });

  it('uses visible label for accessible name', () => {
    render(<Checkbox label="Согласие" />);
    expect(screen.getByRole('checkbox', { name: 'Согласие' })).toBeInTheDocument();
  });
});
