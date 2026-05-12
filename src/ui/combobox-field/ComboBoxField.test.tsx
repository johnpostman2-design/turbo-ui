import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComboBoxField } from './ComboBoxField';

const opts = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
];

describe('ComboBoxField', () => {
  it('renders label linked to input via id and htmlFor', () => {
    render(<ComboBoxField id="cb-1" label="Фрукт" options={opts} placeholder="Введите" />);
    const input = screen.getByPlaceholderText('Введите');
    expect(input).toHaveAttribute('id', 'cb-1');
    const label = screen.getByText('Фрукт');
    expect(label).toHaveAttribute('for', 'cb-1');
  });

  it('renders label linked to textarea in multiline mode', () => {
    render(
      <ComboBoxField id="cb-2" label="Адрес" options={opts} multiline placeholder="Adr" />
    );
    const ta = screen.getByPlaceholderText('Adr');
    expect(ta.tagName).toBe('TEXTAREA');
    expect(ta).toHaveAttribute('id', 'cb-2');
  });

  it('shows helperText and links aria-describedby to helper id', () => {
    render(
      <ComboBoxField
        label="Фрукт"
        helperText="Подсказка"
        options={opts}
        placeholder="P"
      />
    );
    expect(screen.getByText('Подсказка')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('P');
    const ids = input.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
    expect(ids.some((id) => id.includes('helper'))).toBe(true);
  });

  it('shows errorText with role alert and sets aria-invalid; errorText overrides helperText', () => {
    render(
      <ComboBoxField
        label="Фрукт"
        helperText="Подсказка"
        errorText="Только Apple или Banana"
        options={opts}
        placeholder="P"
      />
    );
    expect(screen.queryByText('Подсказка')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Только Apple или Banana');
    const input = screen.getByPlaceholderText('P');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables input and suppresses aria-invalid when disabled', () => {
    render(
      <ComboBoxField label="Фрукт" errorText="Err" options={opts} placeholder="P" disabled />
    );
    const input = screen.getByPlaceholderText('P');
    expect(input).toBeDisabled();
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('merges user aria-describedby with auto helper id', () => {
    render(
      <ComboBoxField
        label="Фрукт"
        helperText="Hint"
        options={opts}
        placeholder="P"
        aria-describedby="extra-hint"
      />
    );
    const input = screen.getByPlaceholderText('P');
    const ids = input.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
    expect(ids).toContain('extra-hint');
    expect(ids.some((id) => id.includes('helper'))).toBe(true);
  });

  it('forwards ref to <input> (single-line)', () => {
    const ref = React.createRef<HTMLInputElement | HTMLTextAreaElement>();
    render(<ComboBoxField ref={ref} label="Фрукт" options={opts} placeholder="Реф" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('forwards ref to <textarea> when multiline', () => {
    const ref = React.createRef<HTMLInputElement | HTMLTextAreaElement>();
    render(
      <ComboBoxField ref={ref} label="Адрес" options={opts} multiline placeholder="Реф" />
    );
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('forwards ComboBox props (options, onChange) — typing fires onChange', () => {
    const onChange = vi.fn();
    function W() {
      const [v, setV] = useState('');
      return (
        <ComboBoxField
          label="Фрукт"
          options={opts}
          value={v}
          onChange={(nv) => { onChange(nv); setV(nv); }}
          placeholder="Введите"
        />
      );
    }
    render(<W />);
    const input = screen.getByPlaceholderText('Введите');
    fireEvent.change(input, { target: { value: 'App' } });
    expect(onChange).toHaveBeenCalledWith('App');
  });

  it('reserves helper slot height even without helperText / errorText', () => {
    const { container } = render(
      <ComboBoxField label="Фрукт" options={opts} placeholder="P" />
    );
    const helpers = container.querySelectorAll('[data-turbo-combobox-field-helper]');
    expect(helpers.length).toBe(1);
    expect(helpers[0].getAttribute('aria-hidden')).toBe('true');
  });

  it('applies className to root wrapper', () => {
    const { container } = render(
      <ComboBoxField className="my-wrap" label="Фрукт" options={opts} placeholder="P" />
    );
    expect(container.firstChild).toHaveClass('my-wrap');
  });

  it('forwards name and required to <input>', () => {
    render(
      <ComboBoxField
        label="Фрукт"
        options={opts}
        placeholder="P"
        name="fruit"
        required
      />
    );
    const input = screen.getByPlaceholderText('P');
    expect(input).toHaveAttribute('name', 'fruit');
    expect(input).toBeRequired();
  });

  it('forwards name and required to <textarea> in multiline mode', () => {
    render(
      <ComboBoxField
        label="Адрес"
        options={opts}
        multiline
        placeholder="P"
        name="address"
        required
      />
    );
    const ta = screen.getByPlaceholderText('P');
    expect(ta.tagName).toBe('TEXTAREA');
    expect(ta).toHaveAttribute('name', 'address');
    expect(ta).toBeRequired();
  });
});
