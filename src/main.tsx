import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/sora';
import '@fontsource-variable/inter';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import { App } from './App';

// Reveal animations only hide content once we know JavaScript is running.
document.documentElement.classList.add('js');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
