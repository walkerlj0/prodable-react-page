import React, { useEffect, useState } from 'react';
import Game from '../components/Game';
import ArbitrumPaymentDemo from '../components/ArbitrumPaymentDemo';
import Footer from '../components/Footer';
import moonoxDocsScreenshot from '../assets/moonox-docs-ss.png';
import prodableLogo from '../assets/prodable-logo-noback.svg';
import './Demos.css';
import './Portfolio.css';

// Animated header logic
const lines = ["D emos"];
function AnimatedDemosHeader() {
  const [displayed, setDisplayed] = useState([""]);
  useEffect(() => {
    // Skip animation in headless environments
    if (typeof window === 'undefined' || process.env.REACT_APP_HEADLESS_BROWSER === 'true') {
      setDisplayed(lines); // Just display the full text immediately
      return;
    }
    
    let currentLine = 0;
    let currentChar = 0;
    const interval = setInterval(() => {
      try {
        if (
          currentLine >= lines.length ||
          currentChar >= (lines[currentLine]?.length || 0)
        ) {
          clearInterval(interval);
          return;
        }
        setDisplayed(prev => {
          if (currentLine >= lines.length) return prev;
          const newDisplayed = [...prev];
          if (!newDisplayed[currentLine]) newDisplayed[currentLine] = "";
          if (currentChar < lines[currentLine].length) {
            newDisplayed[currentLine] += lines[currentLine][currentChar];
          }
          return newDisplayed;
        });
        currentChar++;
        if (currentChar === lines[currentLine].length) {
          currentLine++;
          currentChar = 0;
        }
      } catch (error) {
        console.error('Error in animated header:', error);
        clearInterval(interval);
        setDisplayed(lines); // Fallback to displaying full text
      }
    }, 100);
    
    return () => {
      try {
        clearInterval(interval);
      } catch (error) {
        console.error('Error clearing interval:', error);
      }
    };
  }, []);
  return (
    <h1 className="demos-animated-header">
      {displayed.map((line, idx) => (
        <span key={idx}>{line}<br/></span>
      ))}
    </h1>
  );
}

// PortfolioSection component (copied from Portfolio.js)
function PortfolioSection({ icon, title, text, image, reverse, darkBg, link, caption, embedContent }) {
  // Function to handle image loading errors
  const handleImageError = (e, localImage) => {
    if (localImage) {
      e.target.src = localImage;
    }
  };

  return (
    <section className={`portfolio-section-alt${reverse ? ' reverse' : ''}${darkBg ? ' dark-bg' : ''}`}>
      <div className="portfolio-section-content">
        <div className="portfolio-section-text">
          <div className="portfolio-section-title-row">
            <img src={icon} alt="Section Icon" className="portfolio-section-icon" />
            <h2>{title}</h2>
          </div>
          <p>{text}</p>
        </div>
        <div className="portfolio-section-image">
          {embedContent ? (
            <div className="portfolio-embed-content" dangerouslySetInnerHTML={{ __html: embedContent }} />
          ) : image ? (
            <div className="portfolio-image-wrapper">
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={image} 
                    alt={title} 
                    onError={(e) => handleImageError(e, moonoxDocsScreenshot)}
                  />
                </a>
              ) : (
                <img 
                  src={image} 
                  alt={title} 
                  onError={(e) => handleImageError(e, moonoxDocsScreenshot)}
                />
              )}
              {caption && (
                <div className="portfolio-image-caption" dangerouslySetInnerHTML={{ __html: caption }} />
              )}
            </div>
          ) : (
            <div className="portfolio-image-placeholder">Embed/Image</div>
          )}
        </div>
      </div>
    </section>
  );
}

function Demos() {
  return (
    <div className="page">
      <div className="page-header demos-header">
        <AnimatedDemosHeader />
        <p>Explore our interactive demos to see our technical capabilities in action.</p>
      </div>
      
      <PortfolioSection
        icon={prodableLogo}
        title="Moonnox Docs Site"
        text="Comprehensive technical documentation platform built for developers and technical teams. Features interactive search and navigation, analytics, code examples, tailored branding and styling, and detailed guides to help developers integrate and use Moonnox services effectively."
        image={moonoxDocsScreenshot}
        reverse={false}
        darkBg={false}
        link="https://docs.moonnox.com/"
      />
      
      <section className="demos-section dark-bg">
        <h2>Prodable Runner</h2>
        <p className="game-instructions">Help the Prodable logo jump over obstacles! Press spacebar to start and jump.</p>
        <Game />
      </section>
      
      <section className="demos-section">
        <h2>Arbitrum Smart Contract Payment</h2>
        <p className="demo-instructions">
          Interact with ERC20 tokens on Arbitrum Sepolia testnet. See various tokens you can get from this <a href="https://faucets.chain.link/arbitrum-sepolia" target="_blank" rel="noopener noreferrer">faucet</a>. Connect your MetaMask wallet to check token balances and send payments from your wallet addres.
        </p>
        <ArbitrumPaymentDemo />
      </section>
      
      <Footer />
    </div>
  );
}

export default Demos;
