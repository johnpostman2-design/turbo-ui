import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingInputField } from './FloatingInputField';

describe('FloatingInputField', () => {
  it('does not render when label is empty or only whitespace', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container, rerender } = render(<FloatingInputField label="" />);
    expect(container.firstChild).toBeNull();
    expect(spy).toHaveBeenCalled();
    rerender(<FloatingInputField label="   " />);
    expect(container.firstChild).toBeNull();
    spy.mockRestore();
  });

  it('shows label as overlay when empty and blurred (no native placeholder)', () => {
    render(<FloatingInputField label="Email" />);
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('placeholder')).toBe('');
    expect(input).toHaveAttribute('aria-label', 'Email');
    const labelEl = screen.getByText('Email');
    expect(labelEl).toBeInTheDocument();
    expect(labelEl).toHaveAttribute('data-turbo-floating-input-field-label');
  });

  it('keeps label in DOM and floats when focused', () => {
    render(<FloatingInputField label="Email" />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(input.getAttribute('placeholder')).toBe('');
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('keeps floating state when value is not empty after blur', () => {
    render(<FloatingInputField label="Email" defaultValue="a@b.c" />);
    expect(screen.queryByPlaceholderText('Email')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('a@b.c')).toBeInTheDocument();
  });

  it('renders helper and error like InputField', () => {
    const { rerender } = render(
      <FloatingInputField label="Поле" helperText="Подсказка" />
    );
    expect(screen.getByText('Подсказка')).toBeInTheDocument();

    rerender(<FloatingInputField label="Поле" errorText="Ошибка" error />);
    expect(screen.getByRole('alert')).toHaveTextContent('Ошибка');
  });
});
