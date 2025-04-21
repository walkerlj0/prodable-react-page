import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navigation.css';
import logo from '../assets/prodable-logo-noback.svg';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to scroll to top and close menu
  const scrollToTopAndCloseMenu = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
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
      <Link to="/" className="nav-logo" onClick={scrollToTopAndCloseMenu}>
        <img src={logo} alt="Prodable" />
      </Link>
      <button className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={isMenuOpen ? 'active' : ''}>
        <li><Link to="/" onClick={scrollToTopAndCloseMenu}>Home</Link></li>
        <li><Link to="/portfolio" onClick={scrollToTopAndCloseMenu}>Portfolio</Link></li>
        <li><Link to="/services" onClick={scrollToTopAndCloseMenu}>Services</Link></li>
        <li><Link to="/demos" onClick={scrollToTopAndCloseMenu}>Demos</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
