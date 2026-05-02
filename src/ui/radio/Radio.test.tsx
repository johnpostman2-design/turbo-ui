import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with aria-label', () => {
    render(<Radio aria-label="Тест" name="n" value="1" />);
    expect(screen.getByRole('radio', { name: 'Тест' })).toBeInTheDocument();
  });

  it('applies disabled', () => {
    render(<Radio aria-label="Off" name="n" value="1" disabled />);
    expect(screen.getByRole('radio', { name: 'Off' })).toBeDisabled();
  });

  it('applies error and aria-invalid', () => {
    render(<Radio aria-label="Err" name="n" value="1" error />);
    expect(screen.getByRole('radio', { name: 'Err' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref to input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio ref={ref} aria-label="Ref" name="n" value="1" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('radio');
  });

  it('uses visible label for accessible name', () => {
    render(<Radio name="n" value="1" label="Вариант" />);
    expect(screen.getByRole('radio', { name: 'Вариант' })).toBeInTheDocument();
  });

  it('controlled checked reflects prop', () => {
    const { rerender } = render(<Radio name="n" value="1" checked={false} onChange={() => {}} aria-label="r" />);
    expect((screen.getByRole('radio', { name: 'r' }) as HTMLInputElement).checked).toBe(false);
    rerender(<Radio name="n" value="1" checked onChange={() => {}} aria-label="r" />);
    expect((screen.getByRole('radio', { name: 'r' }) as HTMLInputElement).checked).toBe(true);
  });
});
