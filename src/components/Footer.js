import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Footer.css';
import githubWhiteIcon from '../assets/github-white.png';

function Footer() {
  // Function to smoothly scroll to the contact section
  const scrollWithOffset = (el) => {
    try {
      if (typeof window === 'undefined' || !el) {
        return;
      }
      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = -80; // Adjust this value based on your header height
      window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
    } catch (error) {
      console.error('Error in scrollWithOffset:', error);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Prodable</h3>
          <p><i>Bridging highly technical teams and functional audiences</i></p>
          <a href="https://github.com/walkerlj0/prodable-react-page" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/prodable-react-page.appspot.com/o/github-white.png?alt=media"
              alt="GitHub Repository" 
              className="footer-social-icon"
              style={{ height: '35px', marginTop: '10px' }}
              onError={(e) => {
                e.target.src = githubWhiteIcon;
              }}
            />
          </a>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><HashLink to="/services#contact" scroll={scrollWithOffset}>Contact</HashLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@prodable.org</p>
          <p>Location: Austin, TX</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Prodable. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
