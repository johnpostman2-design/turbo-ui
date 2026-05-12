import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { SelectField } from './SelectField';

const opts = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'nsk', label: 'Новосибирск' },
];

const meta: Meta<typeof SelectField> = {
  title: 'Components/SelectField',
  component: SelectField,
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
      page: docsPageFromModule(() => import('./SelectField.docs'), 'SelectFieldDocsPage'),
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Город',
    options: opts,
    placeholder: 'Выберите',
    helperText: 'Helper text',
    size: 'medium',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Город',
    options: opts,
    placeholder: 'Выберите',
    size: 'medium',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Город',
    options: opts,
    placeholder: 'Выберите',
    helperText: 'Можно выбрать только один',
    size: 'medium',
  },
};

export const WithErrorText: Story = {
  args: {
    label: 'Город',
    options: opts,
    placeholder: 'Выберите',
    errorText: 'Поле обязательно',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Город',
    options: opts,
    placeholder: 'Выберите',
    helperText: 'Недоступно',
    disabled: true,
    size: 'medium',
  },
};

export const Small: Story = {
  args: { ...Default.args, size: 'small' },
};

export const Large: Story = {
  args: { ...Default.args, size: 'large' },
};
