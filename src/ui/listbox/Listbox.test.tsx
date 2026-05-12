import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Listbox } from './Listbox';

const opts = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
];

describe('Listbox', () => {
  it('does not render empty start slot when icon is missing', () => {
    render(
      <Listbox
        options={[{ value: 'a', label: 'Только текст' }]}
        value="a"
        onChange={() => {}}
        showItemStartIcon
      />
    );
    const row = screen.getByRole('option', { name: 'Только текст' });
    expect(row.children.length).toBe(1);
  });

  it('renders options', () => {
    render(<Listbox options={opts} value="a" onChange={() => {}} />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onChange when option clicked', () => {
    const fn = vi.fn();
    function W() {
      const [v, setV] = useState('a');
      return <Listbox options={opts} value={v} onChange={(x) => { fn(x); setV(x); }} />;
    }
    render(<W />);
    fireEvent.click(screen.getByRole('option', { name: 'Beta' }));
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('does not select disabled option', () => {
    const fn = vi.fn();
    render(<Listbox options={opts} value="a" onChange={fn} />);
    fireEvent.click(screen.getByRole('option', { name: 'Gamma' }));
    expect(fn).not.toHaveBeenCalled();
  });

  it('shows check in end slot when showSelectedCheck and selected', () => {
    render(
      <Listbox
        options={[{ value: 'a', label: 'Row' }]}
        value="a"
        onChange={() => {}}
        showSelectedCheck
      />
    );
    const row = screen.getByRole('option', { name: 'Row' });
    expect(row.querySelector('svg')).toBeTruthy();
  });

  it('filters options when search is enabled', () => {
    const searchOpts = [
      { value: '1', label: 'Москва' },
      { value: '2', label: 'Уфа' },
    ];
    render(<Listbox options={searchOpts} value="" onChange={() => {}} search />);
    expect(screen.getByPlaceholderText('Найти в списке…')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Уф' } });
    expect(screen.getByRole('option', { name: 'Уфа' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Москва' })).not.toBeInTheDocument();
  });
});
