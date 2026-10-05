import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Self-hosted font: bundled with the site, so no visitor data goes to Google Fonts (GDPR).
import '@fontsource/fredoka/500.css';
import '@fontsource/fredoka/600.css';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
