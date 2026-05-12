import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectField } from './SelectField';

const opts = [
  { value: 'x', label: 'Икс' },
  { value: 'y', label: 'Игрек' },
];

describe('SelectField', () => {
  it('renders label linked to trigger button via id and htmlFor', () => {
    render(<SelectField id="my-select" label="Поле" options={opts} placeholder="Выбор" />);
    const button = screen.getByRole('button', { name: /Поле/ });
    expect(button).toHaveAttribute('id', 'my-select');
    const label = screen.getByText('Поле');
    expect(label).toHaveAttribute('for', 'my-select');
  });

  it('label htmlFor matches trigger id so click-to-focus works in browsers', () => {
    render(<SelectField id="f1" label="Город" options={opts} placeholder="Выбор" />);
    const label = screen.getByText('Город');
    const button = screen.getByRole('button', { name: /Город/ });
    expect(label).toHaveAttribute('for', 'f1');
    expect(button).toHaveAttribute('id', 'f1');
  });

  it('shows helperText and links aria-describedby to helper id', () => {
    render(<SelectField label="Поле" helperText="Подсказка под полем" options={opts} placeholder="P" />);
    expect(screen.getByText('Подсказка под полем')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Поле/ });
    const describedBy = button.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(describedBy).toContain('helper');
  });

  it('shows errorText with role alert and sets aria-invalid; errorText overrides helperText', () => {
    render(
      <SelectField
        label="Поле"
        helperText="Подсказка"
        errorText="Сначала ошибка"
        options={opts}
        placeholder="P"
      />
    );
    expect(screen.queryByText('Подсказка')).not.toBeInTheDocument();
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Сначала ошибка');
    const button = screen.getByRole('button', { name: /Поле/ });
    expect(button).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables the trigger and suppresses aria-invalid when disabled', () => {
    render(<SelectField label="Поле" errorText="Err" options={opts} placeholder="P" disabled />);
    const button = screen.getByRole('button', { name: /Поле/ });
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute('aria-invalid');
  });

  it('merges user aria-describedby with auto helper id', () => {
    render(
      <SelectField
        label="Поле"
        helperText="Hint"
        options={opts}
        placeholder="P"
        aria-describedby="extra-hint"
      />
    );
    const button = screen.getByRole('button', { name: /Поле/ });
    const ids = button.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
    expect(ids).toContain('extra-hint');
    expect(ids.some((id) => id.includes('helper'))).toBe(true);
  });

  it('forwards ref to the trigger button', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<SelectField ref={ref} label="Поле" options={opts} placeholder="Реф" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('forwards Select props (options, onChange) — opens and selects', () => {
    const fn = vi.fn();
    function W() {
      const [v, setV] = useState('');
      return (
        <SelectField
          label="Сортировка"
          options={opts}
          value={v}
          onChange={(nv) => { fn(nv); setV(nv); }}
          placeholder="Выбор"
        />
      );
    }
    render(<W />);
    fireEvent.click(screen.getByRole('button', { name: /Сортировка/ }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: 'Игрек' }));
    expect(fn).toHaveBeenCalledWith('y');
  });

  it('reserves helper slot height even without helperText / errorText', () => {
    const { container } = render(
      <SelectField label="Поле" options={opts} placeholder="P" />
    );
    const helpers = container.querySelectorAll('[data-turbo-select-field-helper]');
    expect(helpers.length).toBe(1);
    expect(helpers[0].getAttribute('aria-hidden')).toBe('true');
  });

  it('applies className to root wrapper', () => {
    const { container } = render(
      <SelectField className="my-wrap" label="Поле" options={opts} placeholder="P" />
    );
    expect(container.firstChild).toHaveClass('my-wrap');
  });

  it('forwards name and form attributes onto the trigger button', () => {
    render(
      <SelectField
        label="Город"
        options={opts}
        placeholder="P"
        name="city"
        form="profile-form"
      />
    );
    const button = screen.getByRole('button', { name: /Город/ });
    expect(button).toHaveAttribute('name', 'city');
    expect(button).toHaveAttribute('form', 'profile-form');
  });
});
