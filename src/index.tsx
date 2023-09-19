import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';
import App from './App';

/* Optional CSS normalization with selected element resets */
import '@zendeskgarden/css-bedrock';

import { setupIndexedDB } from './data/seed';



const initializeApp = async () => {
  try {
    // Setup IndexedDB with the obtained keys
    await setupIndexedDB();
    
    // Populate data into IndexedDB
  } catch (error) {
    console.error('Database setup failed:', error);
  }
  const container = document.getElementById('root');
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(
    <div
    style={{
      backgroundColor: DEFAULT_THEME.palette.grey[100],
    }}
  >
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </div>,
  
  );
};

initializeApp();

