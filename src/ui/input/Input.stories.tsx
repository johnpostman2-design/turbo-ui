import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { IconButton } from '../icon-button/IconButton';
import { Icon } from '../../components/icons/Icon';

const iconForEnd = <Icon name="delete-cross-circle" size="100%" />;
const endAdornment = <IconButton icon={iconForEnd} aria-label="Очистить" size="small" />;
const leftIcon = <Icon name="chart" size={20} />;

const InputDocsPageLazy = React.lazy(() =>
  import('./Input.docs').then((m) => ({ default: m.InputDocsPage }))
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
          React.createElement(InputDocsPageLazy)
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
  args: { placeholder: 'Введите текст', size: 'medium' },
};

export const Error: Story = {
  args: { error: true, placeholder: 'you@example.com', size: 'medium' },
};

export const Disabled: Story = {
  args: { placeholder: 'Недоступно', disabled: true, size: 'medium' },
};

export const WithLeftIcon: Story = {
  args: { placeholder: 'Поиск...', leftIcon, size: 'medium' },
};

export const WithEndAdornment: Story = {
  args: { placeholder: 'Введите и нажмите крестик', endAdornment, size: 'medium' },
};

export const WithBothAdornments: Story = {
  args: { placeholder: 'Слева и справа', leftIcon, endAdornment, size: 'medium' },
};
