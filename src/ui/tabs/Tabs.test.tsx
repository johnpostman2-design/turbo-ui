import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabsList, Tab, TabsPanel } from './Tabs';

function BasicTabs(props: { defaultValue?: string; value?: string; onValueChange?: (v: string) => void }) {
  return (
    <Tabs {...props}>
      <TabsList>
        <Tab value="1">Один</Tab>
        <Tab value="2">Два</Tab>
        <Tab value="3" disabled>
          Три
        </Tab>
      </TabsList>
      <TabsPanel value="1">Панель 1</TabsPanel>
      <TabsPanel value="2">Панель 2</TabsPanel>
      <TabsPanel value="3">Панель 3</TabsPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('uncontrolled: first tab selected by default and shows first panel', () => {
    render(<BasicTabs />);
    const tab1 = screen.getByRole('tab', { name: 'Один' });
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Панель 1')).toBeVisible();
    expect(screen.getByText('Панель 2')).not.toBeVisible();
  });

  it('uncontrolled: click changes selection and panel', () => {
    render(<BasicTabs />);
    fireEvent.click(screen.getByRole('tab', { name: 'Два' }));
    expect(screen.getByRole('tab', { name: 'Два' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Панель 2')).toBeVisible();
    expect(screen.getByText('Панель 1')).not.toBeVisible();
  });

  it('controlled: fires onValueChange; DOM follows value prop', () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <BasicTabs value="1" onValueChange={onValueChange} />
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Два' }));
    expect(onValueChange).toHaveBeenCalledWith('2');
    expect(screen.getByRole('tab', { name: 'Один' })).toHaveAttribute('aria-selected', 'true');
    rerender(<BasicTabs value="2" onValueChange={onValueChange} />);
    expect(screen.getByRole('tab', { name: 'Два' })).toHaveAttribute('aria-selected', 'true');
  });

  it('disabled tab does not change value on click', () => {
    const onValueChange = vi.fn();
    render(<BasicTabs defaultValue="1" onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Три' }));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('tab', { name: 'Один' })).toHaveAttribute('aria-selected', 'true');
  });

  it('ArrowRight moves focus to next enabled tab', () => {
    render(<BasicTabs />);
    const tab1 = screen.getByRole('tab', { name: 'Один' });
    tab1.focus();
    fireEvent.keyDown(tab1.closest('[role="tablist"]')!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Два' }));
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Один' }));
  });

  it('Home focuses first enabled tab', () => {
    render(<BasicTabs />);
    screen.getByRole('tab', { name: 'Два' }).focus();
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'Home' });
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Один' }));
  });
});
