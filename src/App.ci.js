import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Simple placeholder components
const Home = () => (
  <div className="page">
    <h1>Prodable</h1>
    <p>A Technical Consulting Agency</p>
    <p>Website is under maintenance. Please check back soon.</p>
  </div>
);

const Services = () => <div className="page"><h1>Services</h1><p>Coming soon</p></div>;
const Portfolio = () => <div className="page"><h1>Portfolio</h1><p>Coming soon</p></div>;
const Contact = () => <div className="page"><h1>Contact</h1><p>Coming soon</p></div>;

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/portfolio">Portfolio</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;