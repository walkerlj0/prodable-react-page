import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Enhanced error handling for CI environment
const renderApp = () => {
  // Check if we're in a CI environment
  const isCI = process.env.REACT_APP_CI_BUILD === 'true' || 
               process.env.REACT_APP_HEADLESS_BROWSER === 'true' ||
               process.env.CI === 'true';
  
  // If in CI, just log that we're skipping render
  if (isCI) {
    console.log('CI environment detected, skipping DOM rendering');
    return;
  }
  
  try {
    // Check if document exists (for SSR/headless environments)
    if (typeof document === 'undefined') {
      console.log('Document is undefined, skipping render');
      return;
    }
    
    const rootElement = document.getElementById('root');
    
    // Check if we're in a proper DOM environment
    if (rootElement && rootElement.tagName) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } else {
      console.log('Root element not found, skipping render');
    }
  } catch (error) {
    console.error('Error rendering React app:', error);
  }
};

// Execute the render function
renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
