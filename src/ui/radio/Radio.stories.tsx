import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import { Radio } from './Radio';

function focusInputVisible(el: HTMLInputElement | null) {
  if (!el) return;
  (el.focus as (options?: { preventScroll?: boolean; focusVisible?: boolean }) => void)({ focusVisible: true });
}

function RadioFocusStoryDemo() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [demoFocusRing, setDemoFocusRing] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Radio
        ref={inputRef}
        demoFocusRing={demoFocusRing}
        name="focus-demo"
        value="a"
        label="Пример с программным фокусом"
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

function RadioGroupStoryDemo() {
  const [value, setValue] = useState('b');
  return (
    <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
      <legend style={{ marginBottom: 8, fontSize: 12 }}>План (controlled)</legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <Radio name="plan-group" value="a" checked={value === 'a'} onChange={() => setValue('a')} label="Free" />
        <Radio name="plan-group" value="b" checked={value === 'b'} onChange={() => setValue('b')} label="Pro" />
        <Radio name="plan-group" value="c" checked={value === 'c'} onChange={() => setValue('c')} label="Enterprise" />
      </div>
    </fieldset>
  );
}

const RadioDocsPageLazy = React.lazy(() => import('./Radio.docs').then((m) => ({ default: m.RadioDocsPage })));

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
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
          React.createElement(RadioDocsPageLazy)
        ),
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    checked: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'story-default', value: '1', label: 'Пример' },
};

export const Checked: Story = {
  args: { name: 'story-checked', value: '1', checked: true, label: 'Выбран' },
};

export const Error: Story = {
  args: { name: 'story-err', value: '1', error: true, label: 'Ошибка' },
};

export const Disabled: Story = {
  args: { name: 'story-dis', value: '1', disabled: true, checked: true, label: 'Disabled' },
};

export const Focus: Story = {
  name: 'Focus',
  parameters: {
    docs: {
      description: {
        story:
          'Рамка только при Tab (`:focus-visible`). Кнопки используют `demoFocusRing` — не для продакшена.',
      },
    },
  },
  render: () => <RadioFocusStoryDemo />,
};

export const Sizes: Story = {
  name: 'Размеры',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Radio size="small" name="story-sz-sm" value="1" defaultChecked label="Small" />
      <Radio size="medium" name="story-sz-md" value="1" defaultChecked label="Medium" />
      <Radio size="large" name="story-sz-lg" value="1" defaultChecked label="Large" />
    </div>
  ),
};

export const Group: Story = {
  name: 'Группа',
  render: () => <RadioGroupStoryDemo />,
};

export const Matrix: Story = {
  name: 'Матрица',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '1rem', alignItems: 'center' }}>
      <span />
      <span style={{ fontSize: 12 }}>не выбран</span>
      <span style={{ fontSize: 12 }}>выбран</span>
      <span style={{ fontSize: 12 }}>small</span>
      <Radio size="small" name="mx-s" value="0" aria-label="s0" />
      <Radio size="small" name="mx-s2" value="1" defaultChecked aria-label="s1" />
      <span style={{ fontSize: 12 }}>medium</span>
      <Radio size="medium" name="mx-m" value="0" aria-label="m0" />
      <Radio size="medium" name="mx-m2" value="1" defaultChecked aria-label="m1" />
      <span style={{ fontSize: 12 }}>large</span>
      <Radio size="large" name="mx-l" value="0" aria-label="l0" />
      <Radio size="large" name="mx-l2" value="1" defaultChecked aria-label="l1" />
    </div>
  ),
};
