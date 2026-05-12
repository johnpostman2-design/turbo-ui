import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TokensReference } from './TokensReference';

const meta: Meta = {
  title: 'Foundations/Tokens',
  component: TokensReference,
  parameters: {
    docs: {
      page: () => <TokensReference />,
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
  render: () => <TokensReference />,
};
