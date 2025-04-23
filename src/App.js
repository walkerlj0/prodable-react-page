import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Demos from './pages/Demos';

// Analytics tracking component
function RouteTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Send pageview with react-router location
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    console.log(`[Analytics] Pageview tracked: ${location.pathname}`);
  }, [location]);
  
  return null;
}

function App() {
  return (
    <Router>
      <RouteTracker />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/demos" element={<Demos />} />
      </Routes>
    </Router>
  );
}

export default App;
