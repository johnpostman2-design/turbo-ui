import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders label linked to input via id and htmlFor', () => {
    render(
      <InputField id="my-field" label="Имя" placeholder="Введите имя" />
    );
    const input = screen.getByPlaceholderText('Введите имя');
    const label = screen.getByText('Имя');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'my-field');
    expect(input).toHaveAttribute('id', 'my-field');
  });

  it('shows helperText and sets aria-describedby to helper id', () => {
    render(
      <InputField label="Поле" helperText="Подсказка под полем" placeholder="Текст" />
    );
    expect(screen.getByText('Подсказка под полем')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Текст');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(describedBy).toContain('helper');
  });

  it('shows errorText with role alert and sets aria-invalid on input', () => {
    render(
      <InputField label="Поле" errorText="Ошибка" placeholder="Текст" />
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Ошибка');
    const input = screen.getByPlaceholderText('Текст');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('prioritizes errorText over helperText', () => {
    render(
      <InputField
        label="Поле"
        helperText="Подсказка"
        errorText="Сначала ошибка"
        placeholder="Текст"
      />
    );
    expect(screen.queryByText('Подсказка')).not.toBeInTheDocument();
    expect(screen.getByText('Сначала ошибка')).toBeInTheDocument();
  });

  it('disables input when disabled', () => {
    render(<InputField label="Поле" placeholder="Текст" disabled />);
    expect(screen.getByPlaceholderText('Текст')).toBeDisabled();
  });

  it('forwards ref to DOM input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<InputField ref={ref} label="Поле" placeholder="Реф" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.getAttribute('placeholder')).toBe('Реф');
  });

  it('merges aria-describedby with user value', () => {
    render(
      <InputField
        label="Поле"
        helperText="Подсказка"
        placeholder="Текст"
        aria-describedby="extra-hint"
      />
    );
    const input = screen.getByPlaceholderText('Текст');
    const ids = input.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
    expect(ids).toContain('extra-hint');
    expect(ids.some((id) => id.includes('helper'))).toBe(true);
  });

  it('applies className to root wrapper', () => {
    const { container } = render(
      <InputField className="my-wrapper" label="Поле" placeholder="Текст" />
    );
    expect(container.firstChild).toHaveClass('my-wrapper');
  });

  it('sets error visual when error prop without errorText', () => {
    render(<InputField label="Поле" placeholder="Текст" error />);
    expect(screen.getByPlaceholderText('Текст')).toHaveAttribute('aria-invalid', 'true');
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<InputField label="Поле" placeholder="Текст" onChange={onChange} />);
    const input = screen.getByPlaceholderText('Текст');
    fireEvent.change(input, { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
