import * as React from 'react';
import { render } from 'react-dom';
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';
import App from './App';

/* Optional CSS normalization with selected element resets */
import '@zendeskgarden/css-bedrock';

const rootElement = document.getElementById('root');

render(
  <div
    style={{
      backgroundColor: DEFAULT_THEME.palette.grey[100],
    }}
  >
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </div>,
  rootElement
);
