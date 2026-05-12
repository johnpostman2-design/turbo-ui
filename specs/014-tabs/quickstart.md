# Quickstart: Tabs

## Минимальный пример

```tsx
import 'turbo-ui/styles/theme';
import { Tabs, TabsList, Tab, TabsPanel } from 'turbo-ui';

export function Example() {
  return (
    <Tabs defaultValue="1">
      <TabsList>
        <Tab value="1">Вкладка 1</Tab>
        <Tab value="2">Вкладка 2</Tab>
      </TabsList>
      <TabsPanel value="1">Контент в первой вкладке</TabsPanel>
      <TabsPanel value="2">Контент во второй вкладке</TabsPanel>
    </Tabs>
  );
}
```

## Controlled

```tsx
const [tab, setTab] = useState('a');
return (
  <Tabs value={tab} onValueChange={setTab}>
    <TabsList>
      <Tab value="a">A</Tab>
      <Tab value="b">B</Tab>
    </TabsList>
    <TabsPanel value="a">…</TabsPanel>
    <TabsPanel value="b">…</TabsPanel>
  </Tabs>
);
```

## Disabled

```tsx
<Tab value="x" disabled>
  Недоступно
</Tab>
```

## Проверка

1. Клик меняет видимую панель.  
2. Стрелки двигают фокус между вкладками.  
3. `npm test` — тесты `Tabs.test.tsx`.
