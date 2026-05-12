import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { TextArea } from './TextArea';

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
      page: docsPageFromModule(() => import('./TextArea.docs'), 'TextAreaDocsPage'),
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

/** Состояние invalid по макету: рамка error, значение — primary. Текст ошибки рисуется внешней обёрткой (`TextAreaField`). */
export const Invalid: Story = {
  name: 'Invalid',
  args: { error: true, defaultValue: 'Value', size: 'medium' },
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
