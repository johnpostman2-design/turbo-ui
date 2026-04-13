import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import { IconButton } from '../icon-button/IconButton';
import { Icon } from '../../components/icons/Icon';

const iconForEnd = <Icon name="delete-cross-circle" size="100%" />;
const endAdornment = <IconButton icon={iconForEnd} aria-label="Очистить" size="small" />;
const leftIcon = <Icon name="chart" size={20} />;

const InputFieldDocsPageLazy = React.lazy(() =>
  import('./InputField.docs').then((m) => ({ default: m.InputFieldDocsPage }))
);

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
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
          React.createElement(InputFieldDocsPageLazy)
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
    placeholder: 'Placeholder',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    endAdornment: <IconButton icon={iconForEnd} aria-label="Очистить" size="large" />,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
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
    placeholder: 'Недоступно',
    disabled: true,
    size: 'medium',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Поиск',
    helperText: 'Подсказка',
    placeholder: 'Запрос',
    leftIcon,
    endAdornment,
    size: 'medium',
  },
};

export const WithoutHelper: Story = {
  args: {
    label: 'Без helper',
    placeholder: 'Только поле',
    size: 'medium',
  },
};
