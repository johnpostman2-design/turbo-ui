import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { ComboBox } from './ComboBox';
import { Icon } from '../../components/icons/Icon';

const options = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'ekb', label: 'Екатеринбург' },
];

const many = Array.from({ length: 24 }, (_, i) => ({ value: `c${i}`, label: `Город ${i + 1}` }));

const meta: Meta<typeof ComboBox> = {
  title: 'Components/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Поле ввода с выпадающим списком подсказок. Canvas — типовые сценарии; подробности на вкладке **Docs**.',
      },
      page: docsPageFromModule(() => import('./ComboBox.docs'), 'ComboBoxDocsPage'),
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
type Story = StoryObj<typeof ComboBox>;

const w = '280px';

export const Default: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox options={options} value={v} onChange={setV} placeholder="Город" width={w} />
    );
  },
};

export const WithFilter: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox options={many} value={v} onChange={setV} placeholder="Начните ввод…" width={w} />
    );
  },
};

export const HighlightMatch: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox
        options={many}
        value={v}
        onChange={setV}
        placeholder="Поиск с подсветкой"
        width={w}
        highlightMatch
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'flex-start' }}>
        <ComboBox size="small" options={options} value={a} onChange={setA} placeholder="Small" width={w} />
        <ComboBox size="medium" options={options} value={b} onChange={setB} placeholder="Medium" width={w} />
        <ComboBox size="large" options={options} value={c} onChange={setC} placeholder="Large" width={w} />
      </div>
    );
  },
};

export const Borderless: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox options={options} value={v} onChange={setV} placeholder="Без обводки" width={w} borderless />
    );
  },
};

export const Multiline: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox multiline options={options} value={v} onChange={setV} placeholder="Многострочное" width={w} />
    );
  },
};

export const Clearable: Story = {
  render: () => {
    const [v, setV] = useState('msk');
    return <ComboBox options={options} value={v} onChange={setV} width={w} />;
  },
};

export const Mask: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox
        options={[{ value: '+79991234567', label: '+7 (999) 123-45-67' }]}
        value={v}
        onChange={setV}
        mask="+7 (999) 999-99-99"
        placeholder="Телефон"
        width={w}
      />
    );
  },
};

export const MaxLength: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox options={options} value={v} onChange={setV} maxLength={12} placeholder="Макс. 12 символов" width={w} />
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox
        options={many}
        value={v}
        onChange={setV}
        placeholder="Панель сверху"
        width={w}
        positions="top left"
      />
    );
  },
};

export const MenuMaxHeight: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox options={many} value={v} onChange={setV} placeholder="Высота меню" width={w} menuMaxHeight="120px" />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [v, setV] = useState('x');
    return (
      <ComboBox options={options} value={v} onChange={setV} width={w} error placeholder="Ошибка" />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <ComboBox options={options} value="msk" onChange={() => {}} width={w} disabled placeholder="Заблокировано" />
  ),
};

export const StartIcon: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ComboBox
        options={options}
        value={v}
        onChange={setV}
        startIcon={<Icon name="chart" size="100%" />}
        placeholder="С иконкой"
        width={w}
      />
    );
  },
};
