import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { TextAreaField } from './TextAreaField';

const meta: Meta<typeof TextAreaField> = {
  title: 'Components/TextAreaField',
  component: TextAreaField,
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
      page: docsPageFromModule(() => import('./TextAreaField.docs'), 'TextAreaFieldDocsPage'),
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    rows: { control: 'number' },
    borderless: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Комментарий',
    placeholder: 'Введите текст',
    helperText: 'Не больше 240 символов',
    rows: 4,
    size: 'medium',
  },
};

export const WithLabel: Story = {
  args: { label: 'Комментарий', placeholder: 'Введите текст', rows: 3 },
};

export const WithHelperText: Story = {
  args: { label: 'Комментарий', placeholder: 'Введите текст', helperText: 'До 500 символов', rows: 3 },
};

export const WithErrorText: Story = {
  args: { label: 'Описание', errorText: 'Поле обязательно', rows: 3 },
};

export const Disabled: Story = {
  args: { label: 'Заметки', disabled: true, defaultValue: 'Доступ к полю заблокирован', rows: 3 },
};

export const Small: Story = { args: { ...Default.args, size: 'small' } };
export const Large: Story = { args: { ...Default.args, size: 'large' } };

export const Rows: Story = {
  args: { label: 'Многострочный ввод', rows: 6, helperText: 'Видно 6 строк', placeholder: 'Введите длинный текст' },
};

export const MaxLength: Story = {
  args: { label: 'Лимит', maxLength: 80, helperText: 'Не больше 80 символов', placeholder: 'Введите' },
};
