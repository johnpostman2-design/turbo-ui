import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/fonts.css';
import './styles/theme.css';
import './styles/global.css';
import './playground.css';
import { TurboUIProvider } from './provider';
import { Button } from './ui/button';

function Playground() {
  return (
    <TurboUIProvider>
      <div className="playground">
        <h1>Turbo UI Playground</h1>
        <p>
          Библиотека компонентов. Сторибук: <a href="http://localhost:6006">localhost:6006</a>
        </p>
        <div className="playground-actions">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="text">Text</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
    </TurboUIProvider>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <Playground />
    </React.StrictMode>
  );
}
