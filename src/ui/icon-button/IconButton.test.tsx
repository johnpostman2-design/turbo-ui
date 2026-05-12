import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders icon as child and exposes button role', () => {
    render(<IconButton icon={<span data-testid="ico">★</span>} aria-label="Закрыть" />);
    expect(screen.getByRole('button', { name: /закрыть/i })).toBeInTheDocument();
    expect(screen.getByTestId('ico')).toHaveTextContent('★');
  });

  it('applies variant secondary', () => {
    const { container } = render(
      <IconButton variant="secondary" icon={<span />} aria-label="Настройки" />
    );
    const btn = screen.getByRole('button', { name: /настройки/i });
    expect(btn).toBeInTheDocument();
    expect(container.querySelector('button')).toBe(btn);
  });

  it('respects disabled', () => {
    render(<IconButton disabled icon={<span />} aria-label="Удалить" />);
    expect(screen.getByRole('button', { name: /удалить/i })).toBeDisabled();
  });

  it('calls onClick when enabled', () => {
    const onClick = vi.fn();
    render(<IconButton icon={<span />} aria-label="Плюс" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /плюс/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to native button', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} icon={<span />} aria-label="ref" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
