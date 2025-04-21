import React, { useEffect, useState } from 'react';
import Game from '../components/Game';
import ArbitrumPaymentDemo from '../components/ArbitrumPaymentDemo';
import Footer from '../components/Footer';
import './Demos.css';

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

function Demos() {
  return (
    <div className="page">
      <div className="page-header demos-header">
        <AnimatedDemosHeader />
        <p>Explore our interactive demos to see our technical capabilities in action.</p>
      </div>
      
      <section className="demos-section dark-bg">
        <h2>Prodable Runner</h2>
        <p className="game-instructions">Help the Prodable logo jump over obstacles! Press spacebar to start and jump.</p>
        <Game />
      </section>
      
      <section className="demos-section">
        <h2>Arbitrum Smart Contract Payment</h2>
        <p className="demo-instructions">
          Interact with ERC20 tokens on Arbitrum Sepolia testnet. Connect your MetaMask wallet to check token balances and send test payments.
        </p>
        <ArbitrumPaymentDemo />
      </section>
      
      <Footer />
    </div>
  );
}

export default Demos;
