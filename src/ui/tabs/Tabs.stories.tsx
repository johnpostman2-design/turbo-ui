import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { Tabs, TabsList, Tab, TabsPanel } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '8px', maxWidth: 720 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: docsPageFromModule(() => import('./Tabs.docs'), 'TabsDocsPage'),
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="a">
      <TabsList>
        <Tab value="a">Профиль</Tab>
        <Tab value="b">Настройки</Tab>
        <Tab value="c">Оплата</Tab>
      </TabsList>
      <TabsPanel value="a">Содержимое вкладки «Профиль».</TabsPanel>
      <TabsPanel value="b">Содержимое вкладки «Настройки».</TabsPanel>
      <TabsPanel value="c">Содержимое вкладки «Оплата».</TabsPanel>
    </Tabs>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['large', 'medium', 'small'] as const).map((size) => (
        <Tabs key={size} defaultValue="1" size={size}>
          <TabsList>
            <Tab value="1">Первая</Tab>
            <Tab value="2">Вторая</Tab>
          </TabsList>
          <TabsPanel value="1">Размер: {size}</TabsPanel>
          <TabsPanel value="2">…</TabsPanel>
        </Tabs>
      ))}
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="1">
      <TabsList>
        <Tab value="1">Активна</Tab>
        <Tab value="2" disabled>
          Заблокирована
        </Tab>
        <Tab value="3">Ещё</Tab>
      </TabsList>
      <TabsPanel value="1">Панель 1</TabsPanel>
      <TabsPanel value="2">Не показывается</TabsPanel>
      <TabsPanel value="3">Панель 3</TabsPanel>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [v, setV] = useState('x');
    return (
      <div>
        <Tabs value={v} onValueChange={setV}>
          <TabsList>
            <Tab value="x">X</Tab>
            <Tab value="y">Y</Tab>
          </TabsList>
          <TabsPanel value="x">Значение: x</TabsPanel>
          <TabsPanel value="y">Значение: y</TabsPanel>
        </Tabs>
        <p style={{ marginTop: 16, fontFamily: 'var(--family-brand)' }}>
          Снаружи: <code>{v}</code>
        </p>
      </div>
    );
  },
};
