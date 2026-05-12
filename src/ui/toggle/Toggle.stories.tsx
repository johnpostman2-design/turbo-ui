import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '8px', fontFamily: 'var(--family-brand)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: docsPageFromModule(() => import('./Toggle.docs'), 'ToggleDocsPage'),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => <Toggle startText="Уведомления" />,
};

export const On: Story = {
  render: () => <Toggle defaultChecked startText="Уведомления" />,
};

export const Small: Story = {
  render: () => <Toggle size="small" startText="Тёмная тема" />,
};

export const Medium: Story = {
  render: () => <Toggle size="medium" startText="Тёмная тема" />,
};

export const Large: Story = {
  render: () => <Toggle size="large" startText="Тёмная тема" />,
};

export const WithStartText: Story = {
  render: () => <Toggle startText="Двухфакторная аутентификация" />,
};

export const WithEndText: Story = {
  render: () => <Toggle endText="Двухфакторная аутентификация" />,
};

export const BothStartAndEndText: Story = {
  render: () => <Toggle startText="Off" endText="On" />,
};

export const Disabled: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'flex-start',
      }}
    >
      <Toggle disabled startText="Двухфакторная аутентификация" />
      <Toggle disabled defaultChecked startText="Включено системой" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const Wrapper = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Toggle
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          startText={checked ? 'Тёмная тема включена' : 'Тёмная тема выключена'}
        />
      );
    };
    return <Wrapper />;
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-start',
      }}
    >
      <Toggle size="small" startText="Small" />
      <Toggle size="medium" startText="Medium" />
      <Toggle size="large" startText="Large" />
    </div>
  ),
};
