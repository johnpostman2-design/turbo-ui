import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoadingIcon } from '../components/icons/LoadingIcon';
import { ChartIcon } from '../components/icons/ChartIcon';
import { CloudIcon } from '../components/icons/CloudIcon';

const meta: Meta = {
  title: 'Components/Icons',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  render: () => {
    const icons = [
      {
        name: 'Chart',
        component: <ChartIcon stroke="#000000" size={24} />,
        description: 'Иконка графика'
      },
      {
        name: 'Cloud',
        component: <CloudIcon stroke="#000000" size={24} />,
        description: 'Иконка облака'
      },
      {
        name: 'Loading',
        component: <LoadingIcon stroke="#000000" size={24} />,
        description: 'Иконка загрузки с анимацией вращения'
      }
    ];

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '2rem',
        padding: '2rem'
      }}>
        {icons.map((icon, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              background: '#ffffff'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              background: '#f5f5f5',
              borderRadius: '8px'
            }}>
              {icon.component}
            </div>
            <div style={{
              textAlign: 'center',
              fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)'
            }}>
              <h3 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '16px',
                fontWeight: 'normal',
                color: '#000000'
              }}>
                {icon.name}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#666666'
              }}>
                {icon.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export const Loading: Story = {
  render: () => (
    <div style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)' }}>Small (16px)</h3>
        <LoadingIcon stroke="#000000" size={16} />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)' }}>Medium (24px)</h3>
        <LoadingIcon stroke="#000000" size={24} />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)' }}>Large (32px)</h3>
        <LoadingIcon stroke="#000000" size={32} />
      </div>
    </div>
  )
};

export const Chart: Story = {
  render: () => (
    <div style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)' }}>Small (16px)</h3>
        <ChartIcon stroke="#000000" size={16} />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)' }}>Medium (24px)</h3>
        <ChartIcon stroke="#000000" size={24} />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)' }}>Large (32px)</h3>
        <ChartIcon stroke="#000000" size={32} />
      </div>
    </div>
  )
};

export const Cloud: Story = {
  render: () => (
    <div style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)' }}>Small (16px)</h3>
        <CloudIcon stroke="#000000" size={16} />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)' }}>Medium (24px)</h3>
        <CloudIcon stroke="#000000" size={24} />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--family-brand, "ONY ONE", sans-serif)' }}>Large (32px)</h3>
        <CloudIcon stroke="#000000" size={32} />
      </div>
    </div>
  )
};

