// This is a CI-only entry point that doesn't attempt to render anything
// It's used to allow the build to complete in headless environments

import './index.css';
import reportWebVitals from './reportWebVitals';

console.log('CI build mode activated - skipping React rendering');

// Still report web vitals for consistency
reportWebVitals();

// Export a dummy component for testing
export default function App() {
  return null;
}
