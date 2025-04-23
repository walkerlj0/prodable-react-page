import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4';
import emailjs from '@emailjs/browser';

// Initialize Google Analytics
const MEASUREMENT_ID = 'G-6R8JZJ1XJ2';
ReactGA.initialize(MEASUREMENT_ID);

// Initialize EmailJS with your public key
emailjs.init('cMAwUroj7SZsWuqPb');

// Define a global browser environment check that can be reused across components
const isBrowser = typeof window !== 'undefined' && 
                 typeof document !== 'undefined' && 
                 !process.env.REACT_APP_HEADLESS_BROWSER;

// Enhanced error handling for CI environment
const renderApp = () => {
  console.log('[index] Starting React application render process');
  
  // Check if we're in a CI environment
  const isCI = process.env.REACT_APP_CI_BUILD === 'true' || 
               process.env.REACT_APP_HEADLESS_BROWSER === 'true' ||
               process.env.CI === 'true';
  
  // If in CI, just log that we're skipping render
  if (isCI) {
    console.log('[index] CI environment detected, skipping DOM rendering');
    return;
  }
  
  // Check if we're in a browser environment
  if (!isBrowser) {
    console.log('[index] Non-browser environment detected, skipping DOM rendering');
    return;
  }
  
  try {
    console.log('[index] Browser environment confirmed, proceeding with render');
    
    const rootElement = document.getElementById('root');
    console.log('[index] Root element found:', rootElement ? 'Yes' : 'No');
    
    // More detailed check of the root element
    if (!rootElement) {
      console.error('[index] Root element (#root) not found in the DOM');
      return;
    }
    
    if (!rootElement.tagName) {
      console.error('[index] Root element exists but has no tagName property');
      return;
    }
    
    console.log(`[index] Root element tag: ${rootElement.tagName}`);
    
    // Create root and render app
    try {
      const root = ReactDOM.createRoot(rootElement);
      console.log('[index] ReactDOM.createRoot successful, rendering App component');
      
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      
      console.log('[index] App successfully rendered');
      
      // Send initial pageview to Google Analytics after the app is rendered
      if (isBrowser) {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
        console.log('[index] Initial pageview sent to Google Analytics');
      }
    } catch (renderError) {
      console.error('[index] Error during ReactDOM.createRoot or render:', renderError);
    }
  } catch (error) {
    console.error('[index] Unexpected error during React app initialization:', error);
  }
};

// Execute the render function
renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
