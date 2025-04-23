import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import './Navigation.css';
import logo from '../assets/prodable-logo-noback.svg';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to track navigation clicks
  const trackNavClick = (linkName) => {
    ReactGA.event({
      category: 'Navigation',
      action: 'Click',
      label: linkName
    });
    console.log(`[Analytics] Tracked navigation click: ${linkName}`);
  };

  // Function to scroll to top, close menu and track navigation
  const handleNavClick = (linkName) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
    trackNavClick(linkName);
  };

  // Add an effect to scroll to top on route change
  useEffect(() => {
    // Skip in headless environments
    if (typeof window === 'undefined' || process.env.REACT_APP_HEADLESS_BROWSER === 'true') {
      return;
    }
    
    // Only scroll to top if there's no hash in the URL
    if (!window.location.hash) {
      try {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        console.error('Error scrolling to top:', error);
      }
    }
  }, [pathname]);

  return (
    <nav className="nav-menu">
      <Link to="/" className="nav-logo" onClick={() => handleNavClick('Logo')}>
        <img src={logo} alt="Prodable" />
      </Link>
      <button className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={isMenuOpen ? 'active' : ''}>
        <li><Link to="/" onClick={() => handleNavClick('Home')}>Home</Link></li>
        <li><Link to="/portfolio" onClick={() => handleNavClick('Portfolio')}>Portfolio</Link></li>
        <li><Link to="/services" onClick={() => handleNavClick('Services')}>Services</Link></li>
        <li><Link to="/demos" onClick={() => handleNavClick('Demos')}>Demos</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
