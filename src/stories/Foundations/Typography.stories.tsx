import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TypographyDisplay } from './TypographySwatch';

const meta: Meta = {
  title: 'Foundations/Typography',
  component: TypographyDisplay,
  parameters: {
    docs: {
      page: () => <TypographyDisplay />,
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
  render: () => <TypographyDisplay />,
};
