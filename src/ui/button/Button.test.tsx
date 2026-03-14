import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with variant primary by default', () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole('button', { name: /click/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Click');
  });

  it('renders variant secondary', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button', { name: /secondary/i })).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Button state="disabled">Disabled</Button>);
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
  });

  it('applies loading state and is disabled', () => {
    render(<Button state="loading">Loading</Button>);
    const btn = screen.getByRole('button', { name: /loading/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  it('forwards native props (data-testid, type)', () => {
    render(
      <Button data-testid="submit-btn" type="submit">
        Submit
      </Button>
    );
    const btn = screen.getByTestId('submit-btn');
    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toHaveTextContent('Submit');
  });

  it('forwards ref to DOM button', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(getByRole('button', { name: /click me/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('treats deprecated type="primary" as variant', () => {
    render(<Button type="primary">Primary</Button>);
    const btn = screen.getByRole('button', { name: /primary/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });
});
