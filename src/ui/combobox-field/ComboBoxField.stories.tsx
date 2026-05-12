import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { ComboBoxField } from './ComboBoxField';

const airports = [
  { value: 'SVO', label: 'Москва (SVO)' },
  { value: 'LED', label: 'Санкт-Петербург (LED)' },
  { value: 'OVB', label: 'Новосибирск (OVB)' },
  { value: 'KZN', label: 'Казань (KZN)' },
];

const meta: Meta<typeof ComboBoxField> = {
  title: 'Components/ComboBoxField',
  component: ComboBoxField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: docsPageFromModule(() => import('./ComboBoxField.docs'), 'ComboBoxFieldDocsPage'),
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    multiline: { control: 'boolean' },
    borderless: { control: 'boolean' },
    clearable: { control: 'boolean' },
    highlightMatch: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Аэропорт',
    options: airports,
    helperText: 'Начните вводить название города',
    placeholder: 'Поиск аэропорта',
    size: 'medium',
  },
};

export const WithLabel: Story = {
  args: { label: 'Аэропорт', options: airports, placeholder: 'Поиск аэропорта' },
};

export const WithHelperText: Story = {
  args: {
    label: 'Аэропорт',
    options: airports,
    helperText: 'Можно выбрать из списка или ввести вручную',
    placeholder: 'Поиск',
  },
};

export const WithErrorText: Story = {
  args: {
    label: 'IATA код',
    options: airports,
    errorText: 'Введите трёхбуквенный код',
    placeholder: '___',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Аэропорт',
    options: airports,
    disabled: true,
    helperText: 'Недоступно',
    defaultValue: 'Москва (SVO)',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Подробный адрес',
    options: airports,
    multiline: true,
    helperText: 'Поле растёт по выбранному значению',
    placeholder: 'Введите адрес',
  },
};

export const HighlightMatch: Story = {
  args: {
    label: 'Аэропорт',
    options: airports,
    highlightMatch: true,
    helperText: 'Совпадения подсвечиваются',
    placeholder: 'Введите запрос',
  },
};

export const Small: Story = { args: { ...Default.args, size: 'small' } };
export const Large: Story = { args: { ...Default.args, size: 'large' } };
