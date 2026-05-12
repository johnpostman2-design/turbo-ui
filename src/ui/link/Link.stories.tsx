import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { docsPageFromModule } from '../../storybook/docsPageLoader';
import { Icon } from '../../components/icons';
import { Link } from './Link';

type LinkStoryComponent = React.ComponentType<React.ComponentProps<typeof Link>>;

const meta: Meta<LinkStoryComponent> = {
  title: 'Components/Link',
  component: Link as unknown as LinkStoryComponent,
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
      page: docsPageFromModule(() => import('./Link.docs'), 'LinkDocsPage'),
    },
  },
};

export default meta;
type Story = StoryObj<LinkStoryComponent>;

export const Default: Story = {
  render: () => <Link href="/docs">Перейти к документации</Link>,
};

export const Secondary: Story = {
  render: () => (
    <Link href="/docs" variant="secondary">
      Перейти к документации
    </Link>
  ),
};

export const Danger: Story = {
  render: () => (
    <Link href="/docs" variant="danger">
      Удалить аккаунт
    </Link>
  ),
};

export const InParagraph: Story = {
  render: () => (
    <p
      style={{
        fontFamily: 'var(--family-brand)',
        fontSize: 'var(--text-base, 15px)',
        lineHeight: 1.5,
        margin: 0,
        maxWidth: 560,
      }}
    >
      Подробнее в <Link href="/docs">нашей документации</Link>. Если что-то не
      так, <Link onClick={() => alert('контакт')}>напишите нам</Link>.
    </p>
  ),
};

export const InHeading: Story = {
  render: () => (
    <h2 style={{ margin: 0, fontFamily: 'var(--family-brand)' }}>
      Заголовок с <Link href="/docs">внутренней ссылкой</Link>
    </h2>
  ),
};

export const WithStartIcon: Story = {
  render: () => (
    <Link href="/file.pdf" startIcon={<Icon name="cloud" size="100%" />}>
      Скачать PDF
    </Link>
  ),
};

export const WithEndIcon: Story = {
  render: () => (
    <Link
      href="https://example.com"
      target="_blank"
      endIcon={<Icon name="arrow-right" size="100%" />}
    >
      Открыть в новой вкладке
    </Link>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Link href="/x" disabled>
        Ссылка отключена
      </Link>
      <Link disabled onClick={() => {}}>
        Действие отключено
      </Link>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Link
        href="/file.pdf"
        loading
        startIcon={<Icon name="cloud" size="100%" />}
      >
        Скачать
      </Link>
      <Link
        href="https://example.com"
        loading
        endIcon={<Icon name="arrow-right" size="100%" />}
      >
        Открыть в новой вкладке
      </Link>
      <Link href="/docs" loading>
        Загрузка без иконки
      </Link>
    </div>
  ),
};

export const ExternalAutoRel: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'flex-start',
      }}
    >
      <Link href="https://example.com">
        Внешняя ссылка (rel добавится автоматически)
      </Link>
      <Link href="https://example.com" target="_blank">
        Внешняя ссылка в новой вкладке
      </Link>
      <Link href="/docs">Внутренняя ссылка (без rel)</Link>
    </div>
  ),
};

export const AsButton: Story = {
  render: () => (
    <p
      style={{
        fontFamily: 'var(--family-brand)',
        fontSize: 'var(--text-base, 15px)',
        lineHeight: 1.5,
        margin: 0,
        maxWidth: 560,
      }}
    >
      Нажмите <Link onClick={() => alert('действие')}>здесь</Link>, чтобы открыть
      диалог.
    </p>
  ),
};
