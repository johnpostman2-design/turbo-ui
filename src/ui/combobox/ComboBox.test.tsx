import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ComboBox } from './ComboBox';

const options = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
];

describe('ComboBox', () => {
  it('opens panel on focus when options exist', async () => {
    const user = userEvent.setup();
    render(<ComboBox options={options} placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    await user.click(input);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<ComboBox options={options} placeholder="Test" disabled />);
    const input = screen.getByPlaceholderText('Test');
    await user.click(input);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('filters options when typing', async () => {
    const user = userEvent.setup();
    render(<ComboBox options={options} placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    await user.click(input);
    await user.type(input, 'App');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: /Apple/i })).toBeInTheDocument();
    });
    expect(screen.queryByRole('option', { name: /Banana/i })).not.toBeInTheDocument();
  });

  it('writes selected option label into the field', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ComboBox options={options} onChange={onChange} placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    await user.click(input);
    await user.click(screen.getByRole('option', { name: /Banana/i }));
    expect(onChange).toHaveBeenCalledWith('Banana');
  });

  it('shows empty state inside listbox when no options match', async () => {
    const user = userEvent.setup();
    render(<ComboBox options={options} placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    await user.click(input);
    await user.type(input, 'zzz');
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toHaveTextContent('Нет совпадений');
  });

  it('sets aria-invalid when error', () => {
    render(<ComboBox options={options} value="" onChange={() => {}} error placeholder="Test" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });
});
