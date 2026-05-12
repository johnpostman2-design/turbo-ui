import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../components/icons/Icon';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { Listbox } from './Listbox';

const baseOptions = [
  { value: 'a', label: 'Вариант A' },
  { value: 'b', label: 'Вариант B' },
  { value: 'c', label: 'Вариант C', disabled: true },
];

const manyOptions = Array.from({ length: 24 }, (_, i) => ({
  value: `v${i}`,
  label: `Пункт ${i + 1}`,
}));

const storyHint = (text: string) => ({
  parameters: {
    docs: {
      description: {
        story: text,
      },
    },
  },
});

const meta: Meta<typeof Listbox> = {
  title: 'Components/Listbox',
  component: Listbox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '8px', width: '100%', maxWidth: 720 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: docsPageFromModule(() => import('./Listbox.docs'), 'ListboxDocsPage'),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Listbox>;

export const Default: Story = {
  ...storyHint('Базовый список: **options**, **value**, **onChange**. Галочка справа только в составе **Select**.'),
  render: () => {
    const [v, setV] = useState('a');
    return <Listbox options={baseOptions} value={v} onChange={setV} />;
  },
};

export const Sizes: Story = {
  ...storyHint('Размер панели и строк: проп **size** — `small`, `medium` или `large`.'),
  render: () => {
    const [a, setA] = useState('a');
    const [b, setB] = useState('a');
    const [c, setC] = useState('a');
    const opts = baseOptions.filter((o) => !o.disabled);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <div style={{ width: 200, minWidth: 0, flex: '0 0 auto' }}>
          <Listbox size="small" options={opts} value={a} onChange={setA} />
        </div>
        <div style={{ width: 200, minWidth: 0, flex: '0 0 auto' }}>
          <Listbox size="medium" options={opts} value={b} onChange={setB} />
        </div>
        <div style={{ width: 220, minWidth: 0, flex: '0 0 auto' }}>
          <Listbox size="large" options={opts} value={c} onChange={setC} />
        </div>
      </div>
    );
  },
};

export const WithSearch: Story = {
  ...storyHint(
    'Строка поиска над списком (**Input**): **search**, **searchPlaceholder**; при необходимости — **filterItem**.'
  ),
  render: () => {
    const [v, setV] = useState('');
    return (
      <Listbox
        search
        searchPlaceholder="Найти в списке…"
        options={manyOptions}
        value={v}
        onChange={setV}
        maxHeight="220px"
      />
    );
  },
};

export const LongList: Story = {
  ...storyHint('Ограничение высоты области опций: проп **maxHeight** (CSS).'),
  render: () => {
    const [v, setV] = useState('v0');
    return <Listbox options={manyOptions} value={v} onChange={setV} maxHeight="200px" />;
  },
};

export const WithoutStartIconSlot: Story = {
  ...storyHint('Скрыть колонку слева под иконку: **showItemStartIcon={false}**.'),
  render: () => {
    const [v, setV] = useState('a');
    return (
      <Listbox options={baseOptions} value={v} onChange={setV} showItemStartIcon={false} />
    );
  },
};

export const WithStartIcons: Story = {
  ...storyHint('Иконка слева у строки: непустой **option.icon** при **showItemStartIcon**.'),
  render: () => {
    const [v, setV] = useState('a');
    const opts = [
      { value: 'a', label: 'A', icon: <Icon name="chart" size="100%" /> },
      { value: 'b', label: 'B', icon: <Icon name="chart" size="100%" /> },
    ];
    return <Listbox options={opts} value={v} onChange={setV} />;
  },
};
