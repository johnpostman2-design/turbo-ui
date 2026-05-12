import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  // US1: базовое переключение
  it('renders off by default (role=switch, checked=false)', () => {
    render(<Toggle aria-label="On/Off" />);
    const input = screen.getByRole('switch', { name: 'On/Off' }) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.checked).toBe(false);
  });

  it('renders on with defaultChecked', () => {
    render(<Toggle aria-label="X" defaultChecked />);
    const input = screen.getByRole('switch', { name: 'X' }) as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('uncontrolled: click toggles internal state and fires onChange', () => {
    const onChange = vi.fn();
    render(<Toggle aria-label="X" onChange={onChange} />);
    const input = screen.getByRole('switch', { name: 'X' }) as HTMLInputElement;
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.checked).toBe(true);
    fireEvent.click(input);
    expect(input.checked).toBe(false);
  });

  it('controlled: click fires onChange but DOM does not change without consumer setState', () => {
    const onChange = vi.fn();
    render(<Toggle aria-label="X" checked={false} onChange={onChange} />);
    const input = screen.getByRole('switch', { name: 'X' }) as HTMLInputElement;
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.checked).toBe(false);
  });

  it('keyboard: space on focused input fires onChange', () => {
    const onChange = vi.fn();
    render(<Toggle aria-label="X" onChange={onChange} />);
    const input = screen.getByRole('switch', { name: 'X' }) as HTMLInputElement;
    input.focus();
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards ref to HTMLInputElement', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Toggle ref={ref} aria-label="R" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('checkbox');
  });

  // US2: размеры
  it('applies medium size class by default', () => {
    const { container } = render(<Toggle aria-label="X" />);
    const label = container.querySelector('label');
    expect(label?.className).toContain('sizeMedium');
  });

  it('applies small size class', () => {
    const { container } = render(<Toggle aria-label="X" size="small" />);
    expect(container.querySelector('label')?.className).toContain('sizeSmall');
  });

  it('applies large size class', () => {
    const { container } = render(<Toggle aria-label="X" size="large" />);
    expect(container.querySelector('label')?.className).toContain('sizeLarge');
  });

  // US3: подписи
  it('renders startText slot before control', () => {
    render(<Toggle aria-label="X" startText="Уведомления" />);
    expect(screen.getByText('Уведомления')).toBeInTheDocument();
  });

  it('renders endText slot after control', () => {
    render(<Toggle aria-label="X" endText="Тёмная тема" />);
    expect(screen.getByText('Тёмная тема')).toBeInTheDocument();
  });

  it('renders both startText and endText slots', () => {
    render(<Toggle aria-label="X" startText="Off" endText="On" />);
    expect(screen.getByText('Off')).toBeInTheDocument();
    expect(screen.getByText('On')).toBeInTheDocument();
  });

  it('clicking text label toggles value via native <label>', () => {
    const onChange = vi.fn();
    render(<Toggle startText="Кликни" onChange={onChange} />);
    fireEvent.click(screen.getByText('Кликни'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('no text slots rendered when both props are empty', () => {
    const { container } = render(<Toggle aria-label="X" />);
    expect(container.querySelectorAll('span[class*="textStart"], span[class*="textEnd"]')).toHaveLength(
      0
    );
  });

  // US4: disabled
  it('disabled: native input has disabled attr', () => {
    render(<Toggle aria-label="X" disabled />);
    expect(screen.getByRole('switch', { name: 'X' })).toBeDisabled();
  });

  it('disabled: click does not fire onChange', () => {
    const onChange = vi.fn();
    render(<Toggle aria-label="X" disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch', { name: 'X' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disabled: root label has disabled class', () => {
    const { container } = render(<Toggle aria-label="X" disabled />);
    expect(container.querySelector('label')?.className).toContain('disabled');
  });

  // native attrs passthrough
  it('passes through name and value to native input', () => {
    render(<Toggle aria-label="X" name="notify" value="yes" />);
    const input = screen.getByRole('switch', { name: 'X' });
    expect(input).toHaveAttribute('name', 'notify');
    expect(input).toHaveAttribute('value', 'yes');
  });
});
