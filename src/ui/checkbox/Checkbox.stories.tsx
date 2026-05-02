import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import { Checkbox } from './Checkbox';

function focusInputVisible(el: HTMLInputElement | null) {
  if (!el) return;
  (el.focus as (options?: { preventScroll?: boolean; focusVisible?: boolean }) => void)({ focusVisible: true });
}

function CheckboxFocusStoryDemo() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [demoFocusRing, setDemoFocusRing] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Checkbox
        ref={inputRef}
        demoFocusRing={demoFocusRing}
        label="Пример чекбокса с программным фокусом"
        onBlur={() => setDemoFocusRing(false)}
      />
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          type="button"
          variant="secondary"
          size="small"
          startIcon={null}
          endIcon={null}
          onClick={() => {
            setDemoFocusRing(true);
            focusInputVisible(inputRef.current);
          }}
        >
          Дать фокус
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="small"
          startIcon={null}
          endIcon={null}
          onClick={() => {
            inputRef.current?.blur();
            setDemoFocusRing(false);
          }}
        >
          Забрать фокус
        </Button>
      </div>
    </div>
  );
}

const CheckboxDocsPageLazy = React.lazy(() =>
  import('./Checkbox.docs').then((m) => ({ default: m.CheckboxDocsPage }))
);

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '8px' }}>
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
          React.createElement(CheckboxDocsPageLazy)
        ),
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    checked: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Пример' },
};

export const Checked: Story = {
  args: { checked: true, label: 'Включён' },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Частично' },
};

export const Error: Story = {
  args: { error: true, label: 'Ошибка' },
};

export const Disabled: Story = {
  args: { disabled: true, checked: true, label: 'Disabled' },
};

export const Focus: Story = {
  name: 'Focus',
  parameters: {
    docs: {
      description: {
        story:
          'Рамка только при Tab (`:focus-visible`). Кнопки в примере используют `demoFocusRing` + `focus()` / `blur` — не для продакшена.',
      },
    },
  },
  render: () => <CheckboxFocusStoryDemo />,
};

export const Sizes: Story = {
  name: 'Размеры',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Checkbox size="small" label="Small" defaultChecked />
      <Checkbox size="medium" label="Medium" defaultChecked />
      <Checkbox size="large" label="Large" defaultChecked />
    </div>
  ),
};

export const Matrix: Story = {
  name: 'Матрица',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '1rem', alignItems: 'center' }}>
      <span />
      <span style={{ fontSize: 12 }}>unchecked</span>
      <span style={{ fontSize: 12 }}>checked</span>
      <span style={{ fontSize: 12 }}>small</span>
      <Checkbox size="small" aria-label="s0" />
      <Checkbox size="small" aria-label="s1" defaultChecked />
      <span style={{ fontSize: 12 }}>medium</span>
      <Checkbox size="medium" aria-label="m0" />
      <Checkbox size="medium" aria-label="m1" defaultChecked />
      <span style={{ fontSize: 12 }}>large</span>
      <Checkbox size="large" aria-label="l0" />
      <Checkbox size="large" aria-label="l1" defaultChecked />
    </div>
  ),
};
