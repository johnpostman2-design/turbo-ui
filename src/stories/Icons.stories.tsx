import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, iconNames } from '../components/icons';
import { LoadingIcon } from '../components/icons/LoadingIcon';
import { ChartIcon } from '../components/icons/ChartIcon';
import { CloudIcon } from '../components/icons/CloudIcon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icons',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Имя иконки из папки icons',
    },
    size: {
      control: { type: 'number', min: 16, max: 48, step: 4 },
      description: 'Размер в пикселях',
    },
    color: {
      control: 'color',
      description: 'Цвет (токен или hex)',
    },
    state: {
      control: 'radio',
      options: ['default', 'disabled'],
      description: 'Состояние',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFromRegistry: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '1rem',
        padding: '2rem',
      }}
    >
      {iconNames.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem',
            border: '1px solid var(--border-tertiary, #e0e0e0)',
            borderRadius: '8px',
            background: 'var(--background, #fff)',
          }}
        >
          <Icon name={name} size={32} color="var(--content-primary, #000)" />
          <span
            style={{
              fontSize: '12px',
              fontFamily: 'var(--family-brand, sans-serif)',
              color: 'var(--content-secondary, #666)',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: { name: 'plus', color: 'var(--content-primary, #000)' },
  render: (args) => (
    <div style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon {...args} size={16} />
        <span style={{ fontSize: '12px', fontFamily: 'var(--family-brand)' }}>16px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon {...args} size={24} />
        <span style={{ fontSize: '12px', fontFamily: 'var(--family-brand)' }}>24px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon {...args} size={32} />
        <span style={{ fontSize: '12px', fontFamily: 'var(--family-brand)' }}>32px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon {...args} size={48} />
        <span style={{ fontSize: '12px', fontFamily: 'var(--family-brand)' }}>48px</span>
      </div>
    </div>
  ),
};

export const States: Story = {
  args: { name: 'trash', size: 32 },
  render: (args) => (
    <div style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon {...args} state="default" color="var(--content-primary, #000)" />
        <span style={{ fontSize: '12px', fontFamily: 'var(--family-brand)' }}>default</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon {...args} state="disabled" color="var(--content-primary, #000)" />
        <span style={{ fontSize: '12px', fontFamily: 'var(--family-brand)' }}>disabled</span>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  args: { name: 'check', size: 32 },
  render: (args) => (
    <div style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Icon {...args} color="var(--content-primary, #000)" />
      <Icon {...args} color="var(--content-error, #d32f2f)" />
      <Icon {...args} color="var(--content-success, #2e7d32)" />
      <Icon {...args} color="var(--content-caution, #ed6c02)" />
    </div>
  ),
};

export const Default: Story = {
  args: {
    name: 'plus',
    size: 24,
    color: 'currentColor',
    state: 'default',
  },
};

export const LegacyIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      {[
        { name: 'Chart', component: <ChartIcon stroke="#000" size={24} /> },
        { name: 'Cloud', component: <CloudIcon stroke="#000" size={24} /> },
        { name: 'Loading', component: <LoadingIcon stroke="#000" size={24} /> },
      ].map(({ name, component }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-tertiary, #e0e0e0)',
            borderRadius: '8px',
            background: '#fff',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              background: 'var(--surface-secondary, #f5f5f5)',
              borderRadius: 8,
            }}
          >
            {component}
          </div>
          <span style={{ fontFamily: 'var(--family-brand)', fontSize: 14 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
