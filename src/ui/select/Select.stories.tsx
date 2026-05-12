import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { Select } from './Select';

const options = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch', disabled: true },
];

const many = Array.from({ length: 24 }, (_, i) => ({ value: `x${i}`, label: `Строка ${i + 1}` }));

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'В Canvas — варианты как у других компонентов: Default, WithValue, Sizes, Disabled, Error, WithSearch. Подробности и таблица пропсов — на вкладке **Docs**.',
      },
      page: docsPageFromModule(() => import('./Select.docs'), 'SelectDocsPage'),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '16px', minHeight: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

const w = '280px';

/** Пустое значение: в триггере placeholder. */
export const Default: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <Select options={options} value={v} onChange={setV} placeholder="Выберите язык" triggerWidth={w} />;
  },
};

/** Выбранное значение отображается в триггере. */
export const WithValue: Story = {
  render: () => {
    const [v, setV] = useState('en');
    return <Select options={options} value={v} onChange={setV} placeholder="Язык" triggerWidth={w} />;
  },
};

/** Три размера как в макете: small, medium, large. */
export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', alignItems: 'flex-start' }}>
        <Select size="small" options={options} value={a} onChange={setA} placeholder="Small" triggerWidth={w} />
        <Select size="medium" options={options} value={b} onChange={setB} placeholder="Medium" triggerWidth={w} />
        <Select size="large" options={options} value={c} onChange={setC} placeholder="Large" triggerWidth={w} />
      </div>
    );
  },
};

/** Нельзя открыть список. */
export const Disabled: Story = {
  render: () => <Select options={options} value="ru" disabled placeholder="Недоступно" triggerWidth={w} />,
};

/** Ошибка поля: визуал invalid на триггере. */
export const Error: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <Select options={options} value={v} onChange={setV} error placeholder="Обязательное поле" triggerWidth={w} />;
  },
};

/**
 * Прежний id истории `components-select--o-13-error` (закладки, HMR после рефакторинга).
 * Тот же сценарий, что у {@link Error}; в сайдбаре не показывается.
 */
export const O13_Error: Story = {
  ...Error,
  tags: ['!dev', '!test'],
};

/** Поле поиска над списком (состояние интерфейса при длинном списке). */
export const WithSearch: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <Select
        options={many}
        value={v}
        onChange={setV}
        search
        searchPlaceholder="Найти в списке…"
        placeholder="Выберите"
        triggerWidth={w}
      />
    );
  },
};
