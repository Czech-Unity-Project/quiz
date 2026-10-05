import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Showcase from './Showcase';
import '@fontsource/fredoka/500.css';
import '@fontsource/fredoka/600.css';
import '../styles.css';
import './showcase.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Showcase />
  </StrictMode>,
);
