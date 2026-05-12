import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import { Icon } from '../../components/icons/Icon';

const opts = [
  { value: 'x', label: 'Икс' },
  { value: 'y', label: 'Игрек' },
];

describe('Select', () => {
  it('does not open when disabled', () => {
    render(<Select options={opts} value="" onChange={() => {}} disabled placeholder="Пусто" />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('sets aria-invalid when error', () => {
    render(<Select options={opts} value="" onChange={() => {}} error placeholder="Поле" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards name to trigger button for forms', () => {
    render(<Select options={opts} value="" onChange={() => {}} name="language" placeholder="Язык" />);
    expect(screen.getByRole('button')).toHaveAttribute('name', 'language');
  });

  it('renders startIcon in trigger when passed', () => {
    render(
      <Select
        options={opts}
        value=""
        onChange={() => {}}
        startIcon={
          <span data-testid="select-start-icon-wrap">
            <Icon name="chart" size="100%" />
          </span>
        }
        placeholder="С иконкой"
      />
    );
    expect(screen.getByTestId('select-start-icon-wrap')).toBeInTheDocument();
  });

  it('opens, selects and closes', () => {
    const fn = vi.fn();
    function W() {
      const [v, setV] = useState('');
      return <Select options={opts} value={v} onChange={(nv) => { fn(nv); setV(nv); }} placeholder="Выбор" />;
    }
    render(<W />);
    fireEvent.click(screen.getByRole('button', { name: 'Выбор' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: 'Игрек' }));
    expect(fn).toHaveBeenCalledWith('y');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
