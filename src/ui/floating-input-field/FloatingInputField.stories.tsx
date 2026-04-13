import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingInputField } from './FloatingInputField';
import { IconButton } from '../icon-button/IconButton';
import { Icon } from '../../components/icons/Icon';

const iconForEnd = <Icon name="delete-cross-circle" size="100%" />;
const endAdornment = <IconButton icon={iconForEnd} aria-label="Очистить" size="small" />;
/** Размер иконки по макету: small 16 / medium 24 / large 32 */
const leftIconSmall = <Icon name="chart" size={16} />;
const leftIconMedium = <Icon name="chart" size={24} />;
const leftIconLarge = <Icon name="chart" size={32} />;

const FloatingInputFieldDocsPageLazy = React.lazy(() =>
  import('./FloatingInputField.docs').then((m) => ({ default: m.FloatingInputFieldDocsPage }))
);

const meta: Meta<typeof FloatingInputField> = {
  title: 'Components/FloatingInputField',
  component: FloatingInputField,
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
      page: () =>
        React.createElement(
          React.Suspense,
          { fallback: React.createElement('div', { style: { padding: '2rem' } }, 'Загрузка…') },
          React.createElement(FloatingInputFieldDocsPageLazy)
        ),
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'search', 'time', 'date'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    leftIcon: leftIconLarge,
    endAdornment: <IconButton icon={iconForEnd} aria-label="Очистить" size="large" />,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    leftIcon: leftIconSmall,
    endAdornment: <IconButton icon={iconForEnd} aria-label="Очистить" size="small" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    errorText: 'Некорректный адрес',
    error: true,
    defaultValue: 'bad',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
    disabled: true,
    size: 'medium',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Поиск',
    helperText: 'Подсказка',
    leftIcon: leftIconMedium,
    endAdornment,
    size: 'medium',
  },
};

export const WithoutHelper: Story = {
  args: {
    label: 'Поле',
    size: 'medium',
  },
};
