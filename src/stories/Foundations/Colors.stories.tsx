import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorsDisplay } from './ColorSwatch';

const meta: Meta = {
  title: 'Foundations/Colors',
  component: ColorsDisplay,
  parameters: {
    docs: {
      page: () => <ColorsDisplay />,
    },
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Документация: Story = {
  render: () => <ColorsDisplay />,
};
