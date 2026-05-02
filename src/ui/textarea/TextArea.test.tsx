import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('renders with placeholder', () => {
    render(<TextArea placeholder="Введите текст" />);
    expect(screen.getByPlaceholderText('Введите текст')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<TextArea placeholder="Disabled" disabled />);
    const el = screen.getByPlaceholderText('Disabled');
    expect(el).toBeDisabled();
  });

  it('applies error state and aria-invalid', () => {
    render(<TextArea placeholder="Error" error />);
    const el = screen.getByPlaceholderText('Error');
    expect(el).toHaveAttribute('aria-invalid', 'true');
  });

  it('links errorText with aria-describedby', () => {
    render(<TextArea placeholder="P" error errorText="Сообщение об ошибке" />);
    const el = screen.getByPlaceholderText('P');
    const id = el.getAttribute('aria-describedby');
    expect(id).toBeTruthy();
    expect(document.getElementById(id!)).toHaveTextContent('Сообщение об ошибке');
  });

  it('links helperText with aria-describedby when no errorText', () => {
    render(<TextArea placeholder="P" helperText="Подсказка" />);
    const el = screen.getByPlaceholderText('P');
    const id = el.getAttribute('aria-describedby');
    expect(id).toBeTruthy();
    expect(document.getElementById(id!)).toHaveTextContent('Подсказка');
  });

  it('forwards ref to DOM textarea', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} placeholder="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current?.tagName).toBe('TEXTAREA');
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<TextArea placeholder="Test" onChange={onChange} />);
    const el = screen.getByPlaceholderText('Test');
    fireEvent.change(el, { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom className to root', () => {
    const { container } = render(<TextArea placeholder="Test" className="custom-root" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-root');
  });

  it('puts width-related style on root so field border matches textarea', () => {
    const { container } = render(
      <TextArea placeholder="Test" style={{ maxWidth: '280px', minHeight: 120 }} />
    );
    const root = container.firstChild as HTMLElement;
    const ta = screen.getByPlaceholderText('Test') as HTMLTextAreaElement;
    expect(root.style.maxWidth).toBe('280px');
    expect(ta.style.minHeight).toBe('120px');
  });

  it('applies width and maxWidth props to root', () => {
    const { container } = render(<TextArea placeholder="W" width="50%" maxWidth={400} />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.width).toBe('50%');
    expect(root.style.maxWidth).toBe('400px');
  });

  it('sets native rows and uses height-from-rows mode', () => {
    const { container } = render(<TextArea placeholder="R" rows={5} />);
    const ta = screen.getByPlaceholderText('R') as HTMLTextAreaElement;
    expect(ta.getAttribute('rows')).toBe('5');
    const wrap = container.querySelector('[class*="fieldWrap"]');
    expect(wrap?.className).toMatch(/heightFromRows/);
  });

  it('renders small and medium sizes', () => {
    const { rerender } = render(<TextArea size="small" placeholder="S" />);
    expect(screen.getByPlaceholderText('S')).toBeInTheDocument();
    rerender(<TextArea size="medium" placeholder="M" />);
    expect(screen.getByPlaceholderText('M')).toBeInTheDocument();
  });
});
