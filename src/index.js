import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Add error handling for CI environment
const renderApp = () => {
  try {
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
      console.log('Running in a limited environment, skipping render');
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
