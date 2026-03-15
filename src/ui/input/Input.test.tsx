import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders with placeholder and default type text', () => {
    render(<Input placeholder="Введите текст" />);
    const input = screen.getByPlaceholderText('Введите текст');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with type email', () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('applies disabled state', () => {
    render(<Input placeholder="Disabled" disabled />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
  });

  it('applies error state and aria-invalid', () => {
    render(<Input placeholder="Error" error />);
    const input = screen.getByPlaceholderText('Error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards native props (data-testid, id, name, placeholder)', () => {
    render(
      <Input
        data-testid="my-input"
        id="field-1"
        name="username"
        placeholder="Name"
      />
    );
    const input = screen.getByTestId('my-input');
    expect(input).toHaveAttribute('id', 'field-1');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('placeholder', 'Name');
  });

  it('forwards ref to DOM input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<Input placeholder="Test" onChange={onChange} />);
    const input = screen.getByPlaceholderText('Test');
    fireEvent.change(input, { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports controlled value', () => {
    const { rerender } = render(
      <Input value="" placeholder="Controlled" onChange={() => {}} />
    );
    const input = screen.getByPlaceholderText('Controlled');
    expect(input).toHaveValue('');
    rerender(<Input value="hello" placeholder="Controlled" onChange={() => {}} />);
    expect(input).toHaveValue('hello');
  });

  it('supports uncontrolled defaultValue', () => {
    render(<Input defaultValue="initial" placeholder="Uncontrolled" />);
    const input = screen.getByPlaceholderText('Uncontrolled');
    expect(input).toHaveValue('initial');
  });

  it('calls onFocus when input receives focus', () => {
    const onFocus = vi.fn();
    render(<Input placeholder="Focus" onFocus={onFocus} />);
    const input = screen.getByPlaceholderText('Focus');
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input loses focus', () => {
    const onBlur = vi.fn();
    render(<Input placeholder="Blur" onBlur={onBlur} />);
    const input = screen.getByPlaceholderText('Blur');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with leftIcon', () => {
    const icon = <span data-testid="left-icon">L</span>;
    render(<Input leftIcon={icon} placeholder="With icon" />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('With icon')).toBeInTheDocument();
  });

  it('renders with endAdornment', () => {
    const adornment = <button type="button" data-testid="clear-btn">Clear</button>;
    render(<Input endAdornment={adornment} placeholder="With button" />);
    expect(screen.getByTestId('clear-btn')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('With button')).toBeInTheDocument();
  });

  it('applies custom className to root', () => {
    const { container } = render(<Input placeholder="Test" className="custom-root" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-root');
  });

  it('renders with size small by default structure', () => {
    render(<Input size="small" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toBeInTheDocument();
  });

  it('renders with size large', () => {
    render(<Input size="large" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toBeInTheDocument();
  });
});
