import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Link } from './Link';

describe('Link', () => {
  describe('US1 — base rendering with href', () => {
    it('renders as <a> with given href when href is provided', () => {
      render(<Link href="/docs">нашей документации</Link>);
      const a = screen.getByRole('link', { name: /нашей документации/i });
      expect(a).toBeInTheDocument();
      expect(a.tagName).toBe('A');
      expect(a).toHaveAttribute('href', '/docs');
    });

    it('renders children inside the root', () => {
      render(<Link href="/x">Текст ссылки</Link>);
      expect(screen.getByText('Текст ссылки')).toBeInTheDocument();
    });

    it('forwards ref to <a> root', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Link ref={ref} href="/x">
          ref
        </Link>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.tagName).toBe('A');
    });

    it('merges className with module classes', () => {
      render(
        <Link href="/x" className="my-link">
          ссылка
        </Link>
      );
      const a = screen.getByRole('link', { name: /ссылка/i });
      expect(a.className).toMatch(/my-link/);
      expect(a.className.split(/\s+/).length).toBeGreaterThan(1);
    });

    it('applies default variant class when variant is not set', () => {
      render(
        <Link href="/x" data-testid="lnk">
          default
        </Link>
      );
      const a = screen.getByTestId('lnk');
      expect(a.className).toMatch(/variantDefault/);
    });

    it('forwards rest props (data-*, id, aria-label) onto <a>', () => {
      render(
        <Link
          href="/x"
          id="my-id"
          data-testid="rest-link"
          aria-label="aria"
        >
          rest
        </Link>
      );
      const a = screen.getByTestId('rest-link');
      expect(a).toHaveAttribute('id', 'my-id');
      expect(a).toHaveAttribute('aria-label', 'aria');
    });
  });

  describe('US2 — <button> mode, onClick, disabled, target/rel', () => {
    it('renders as <button type="button"> when href is not provided', () => {
      render(<Link onClick={() => {}}>Действие</Link>);
      const btn = screen.getByRole('button', { name: /действие/i });
      expect(btn.tagName).toBe('BUTTON');
      expect(btn).toHaveAttribute('type', 'button');
    });

    it('calls onClick on <a> click', () => {
      const onClick = vi.fn();
      render(
        <Link href="/x" onClick={onClick}>
          a
        </Link>
      );
      fireEvent.click(screen.getByRole('link', { name: /^a$/i }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on <button> click', () => {
      const onClick = vi.fn();
      render(<Link onClick={onClick}>b</Link>);
      fireEvent.click(screen.getByRole('button', { name: /^b$/i }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('disabled <a>: no href, aria-disabled, tabIndex=-1, onClick suppressed', () => {
      const onClick = vi.fn();
      render(
        <Link href="/x" disabled onClick={onClick} data-testid="dlnk">
          disabled
        </Link>
      );
      const a = screen.getByTestId('dlnk');
      expect(a.tagName).toBe('A');
      expect(a).not.toHaveAttribute('href');
      expect(a).toHaveAttribute('aria-disabled', 'true');
      expect(a).toHaveAttribute('tabindex', '-1');
      fireEvent.click(a);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('disabled <button>: native disabled, onClick suppressed', () => {
      const onClick = vi.fn();
      render(
        <Link disabled onClick={onClick}>
          disabled-btn
        </Link>
      );
      const btn = screen.getByRole('button', { name: /disabled-btn/i });
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('external https URL without rel adds rel="noopener noreferrer"', () => {
      render(
        <Link href="https://example.com" target="_blank">
          ext
        </Link>
      );
      const a = screen.getByRole('link', { name: /ext/i });
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('external URL without target also gets rel="noopener noreferrer"', () => {
      render(<Link href="https://example.com">ext</Link>);
      const a = screen.getByRole('link', { name: /ext/i });
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
      expect(a).not.toHaveAttribute('target');
    });

    it('protocol-relative URL is treated as external', () => {
      render(<Link href="//example.com">ext</Link>);
      const a = screen.getByRole('link', { name: /ext/i });
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('relative URL is not external — no auto rel', () => {
      render(<Link href="/docs">internal</Link>);
      const a = screen.getByRole('link', { name: /internal/i });
      expect(a).not.toHaveAttribute('rel');
    });

    it('explicit rel keeps user value (external URL)', () => {
      render(
        <Link href="https://example.com" target="_blank" rel="custom">
          ext
        </Link>
      );
      const a = screen.getByRole('link', { name: /ext/i });
      expect(a).toHaveAttribute('rel', 'custom');
    });

    it('forwards ref to <button> when href is absent', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Link
          ref={ref as unknown as React.Ref<HTMLAnchorElement | HTMLButtonElement>}
        >
          ref-btn
        </Link>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });
  });

  describe('US3 — variants and states', () => {
    it('variant="secondary" applies .variantSecondary class', () => {
      render(
        <Link href="/x" variant="secondary" data-testid="sec">
          s
        </Link>
      );
      expect(screen.getByTestId('sec').className).toMatch(/variantSecondary/);
    });

    it('variant="danger" applies .variantDanger class', () => {
      render(
        <Link href="/x" variant="danger" data-testid="dng">
          d
        </Link>
      );
      expect(screen.getByTestId('dng').className).toMatch(/variantDanger/);
    });

    it('disabled adds .disabled class on anchor', () => {
      render(
        <Link href="/x" disabled data-testid="da">
          d
        </Link>
      );
      expect(screen.getByTestId('da').className).toMatch(/disabled/);
    });

    it('disabled adds .disabled class on button', () => {
      render(
        <Link disabled data-testid="db">
          d
        </Link>
      );
      expect(screen.getByTestId('db').className).toMatch(/disabled/);
    });
  });

  describe('US4 — icons', () => {
    it('renders startIcon slot with aria-hidden', () => {
      render(
        <Link href="/x" startIcon={<svg data-testid="start" />}>
          с иконкой
        </Link>
      );
      const start = screen.getByTestId('start');
      const slot = start.parentElement!;
      expect(slot.tagName).toBe('SPAN');
      expect(slot).toHaveAttribute('aria-hidden', 'true');
      expect(slot.className).toMatch(/iconStart/);
    });

    it('renders endIcon slot with aria-hidden', () => {
      render(
        <Link href="/x" endIcon={<svg data-testid="end" />}>
          с иконкой
        </Link>
      );
      const end = screen.getByTestId('end');
      const slot = end.parentElement!;
      expect(slot.tagName).toBe('SPAN');
      expect(slot).toHaveAttribute('aria-hidden', 'true');
      expect(slot.className).toMatch(/iconEnd/);
    });

    it('does not render icon slots when icons are not provided', () => {
      render(
        <Link href="/x" data-testid="plain">
          без иконок
        </Link>
      );
      const a = screen.getByTestId('plain');
      const spans = a.querySelectorAll('span[aria-hidden="true"]');
      expect(spans.length).toBe(0);
    });
  });

  describe('loading state', () => {
    it('loading blocks click on <a> and removes href', () => {
      const onClick = vi.fn();
      render(
        <Link href="/x" loading onClick={onClick} data-testid="la">
          loading
        </Link>
      );
      const a = screen.getByTestId('la');
      expect(a).not.toHaveAttribute('href');
      expect(a).toHaveAttribute('aria-disabled', 'true');
      expect(a).toHaveAttribute('aria-busy', 'true');
      expect(a).toHaveAttribute('tabindex', '-1');
      fireEvent.click(a);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('loading on <button> sets native disabled and aria-busy', () => {
      const onClick = vi.fn();
      render(
        <Link loading onClick={onClick}>
          loading
        </Link>
      );
      const btn = screen.getByRole('button', { name: /loading/i });
      expect(btn).toBeDisabled();
      expect(btn).toHaveAttribute('aria-busy', 'true');
      fireEvent.click(btn);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('loading replaces startIcon with spinner slot', () => {
      render(
        <Link
          href="/x"
          loading
          startIcon={<svg data-testid="origin-start" />}
          data-testid="lroot"
        >
          load
        </Link>
      );
      expect(screen.queryByTestId('origin-start')).toBeNull();
      const slot = screen
        .getByTestId('lroot')
        .querySelector('span[aria-hidden="true"]');
      expect(slot).not.toBeNull();
      expect(slot!.className).toMatch(/loadingSpinner/);
      expect(slot!.className).toMatch(/iconStart/);
    });

    it('loading replaces endIcon with spinner slot', () => {
      render(
        <Link
          href="/x"
          loading
          endIcon={<svg data-testid="origin-end" />}
          data-testid="lroot"
        >
          load
        </Link>
      );
      expect(screen.queryByTestId('origin-end')).toBeNull();
      const slot = screen
        .getByTestId('lroot')
        .querySelector('span[aria-hidden="true"]');
      expect(slot!.className).toMatch(/loadingSpinner/);
      expect(slot!.className).toMatch(/iconEnd/);
    });

    it('loading without icons does not add spinner', () => {
      render(
        <Link href="/x" loading data-testid="bare">
          load
        </Link>
      );
      const slots = screen
        .getByTestId('bare')
        .querySelectorAll('span[aria-hidden="true"]');
      expect(slots.length).toBe(0);
    });

    it('adds .loading class on root', () => {
      render(
        <Link href="/x" loading data-testid="ld">
          load
        </Link>
      );
      expect(screen.getByTestId('ld').className).toMatch(/loading/);
    });
  });
});
