import React from 'react';
import './App.css';

// This is a minimal version of the App component for CI builds
// It doesn't include any components that might cause issues in headless environments
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Prodable Technical Consulting</h1>
        <p>Website successfully built in CI environment</p>
      </header>
    </div>
  );
}

export default App;