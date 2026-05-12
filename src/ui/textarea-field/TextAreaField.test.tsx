import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextAreaField } from './TextAreaField';

describe('TextAreaField', () => {
  it('renders label linked to textarea via id and htmlFor', () => {
    render(<TextAreaField id="ta-1" label="Комментарий" placeholder="Введите" />);
    const ta = screen.getByPlaceholderText('Введите');
    expect(ta.tagName).toBe('TEXTAREA');
    expect(ta).toHaveAttribute('id', 'ta-1');
    const label = screen.getByText('Комментарий');
    expect(label).toHaveAttribute('for', 'ta-1');
  });

  it('shows helperText and links aria-describedby to helper id', () => {
    render(<TextAreaField label="Поле" helperText="Подсказка" placeholder="P" />);
    expect(screen.getByText('Подсказка')).toBeInTheDocument();
    const ta = screen.getByPlaceholderText('P');
    const ids = ta.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
    expect(ids.some((id) => id.includes('helper'))).toBe(true);
  });

  it('shows errorText with role alert; errorText overrides helperText; aria-invalid set', () => {
    render(
      <TextAreaField
        label="Поле"
        helperText="Подсказка"
        errorText="Поле обязательно"
        placeholder="P"
      />
    );
    expect(screen.queryByText('Подсказка')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Поле обязательно');
    const ta = screen.getByPlaceholderText('P');
    expect(ta).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables textarea and suppresses aria-invalid when disabled', () => {
    render(<TextAreaField label="Поле" errorText="Err" placeholder="P" disabled />);
    const ta = screen.getByPlaceholderText('P');
    expect(ta).toBeDisabled();
    expect(ta).not.toHaveAttribute('aria-invalid');
  });

  it('merges user aria-describedby with auto helper id', () => {
    render(
      <TextAreaField
        label="Поле"
        helperText="Hint"
        placeholder="P"
        aria-describedby="extra-hint"
      />
    );
    const ta = screen.getByPlaceholderText('P');
    const ids = ta.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
    expect(ids).toContain('extra-hint');
    expect(ids.some((id) => id.includes('helper'))).toBe(true);
  });

  it('forwards ref to <textarea>', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextAreaField ref={ref} label="Поле" placeholder="Реф" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current?.getAttribute('placeholder')).toBe('Реф');
  });

  it('renders exactly one helper block — no double helper from TextArea', () => {
    const { container } = render(
      <TextAreaField label="Поле" helperText="Подсказка" placeholder="P" />
    );
    expect(container.querySelectorAll('[data-turbo-textarea-field-helper]').length).toBe(1);
    expect(container.querySelectorAll('[data-turbo-textarea-helper]').length).toBe(0);
  });

  it('forwards rows / maxLength / size to TextArea', () => {
    render(<TextAreaField label="Поле" rows={5} maxLength={140} size="large" placeholder="P" />);
    const ta = screen.getByPlaceholderText('P') as HTMLTextAreaElement;
    expect(ta.getAttribute('rows')).toBe('5');
    expect(ta.getAttribute('maxlength')).toBe('140');
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<TextAreaField label="Поле" placeholder="Test" onChange={onChange} />);
    const ta = screen.getByPlaceholderText('Test');
    fireEvent.change(ta, { target: { value: 'abc' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('reserves helper slot height even without helperText / errorText', () => {
    const { container } = render(<TextAreaField label="Поле" placeholder="P" />);
    const helpers = container.querySelectorAll('[data-turbo-textarea-field-helper]');
    expect(helpers.length).toBe(1);
    expect(helpers[0].getAttribute('aria-hidden')).toBe('true');
  });

  it('applies className to root wrapper', () => {
    const { container } = render(
      <TextAreaField className="my-wrap" label="Поле" placeholder="P" />
    );
    expect(container.firstChild).toHaveClass('my-wrap');
  });

  it('forwards name, required and form onto the textarea', () => {
    render(
      <TextAreaField
        label="Комментарий"
        placeholder="P"
        name="comment"
        required
        form="profile-form"
      />
    );
    const ta = screen.getByPlaceholderText('P');
    expect(ta).toHaveAttribute('name', 'comment');
    expect(ta).toBeRequired();
    expect(ta).toHaveAttribute('form', 'profile-form');
  });
});
