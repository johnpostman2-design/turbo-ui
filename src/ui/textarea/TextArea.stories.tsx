import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const TextAreaDocsPageLazy = React.lazy(() =>
  import('./TextArea.docs').then((m) => ({ default: m.TextAreaDocsPage }))
);

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
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
          React.createElement(TextAreaDocsPageLazy)
        ),
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    rows: { control: 'number' },
    width: { control: 'text' },
    maxWidth: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Placeholder', size: 'medium' },
};

export const WithValue: Story = {
  args: { defaultValue: 'Value', size: 'medium' },
};

/** Состояние invalid по макету: рамка error, значение — primary, подпись — «Error name» (caption/error) */
export const Invalid: Story = {
  name: 'Invalid',
  args: { error: true, errorText: 'Error name', defaultValue: 'Value', size: 'medium' },
};

export const Helper: Story = {
  args: { helperText: 'Не больше 500 символов', size: 'small' },
};

export const Disabled: Story = {
  args: { defaultValue: 'Value', disabled: true, size: 'medium' },
};

export const Small: Story = {
  args: { placeholder: 'Small', size: 'small' },
};

export const Medium: Story = {
  args: { placeholder: 'Medium', size: 'medium' },
};

/** Высота по `rows`, лишний текст — скролл */
export const RowsAndScroll: Story = {
  name: 'Rows + scroll',
  args: {
    rows: 4,
    size: 'medium',
    placeholder: 'Четыре видимые строки…',
    defaultValue: Array.from({ length: 20 }, (_, i) => `Строка ${i + 1}`).join('\n'),
  },
};

/** Ширина в процентах от контейнера (декоратор 320px) */
export const WidthPercent: Story = {
  name: 'Width 50%',
  args: {
    placeholder: '50% ширины родителя',
    width: '50%',
    size: 'medium',
  },
};

/** Ширина в пикселях через проп */
export const WidthPx: Story = {
  name: 'Width 280px',
  args: {
    placeholder: '280px',
    width: 280,
    size: 'small',
  },
};
