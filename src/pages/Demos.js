import React, { useEffect, useState } from 'react';
import Game from '../components/Game';
import Footer from '../components/Footer';
import './Demos.css';

// Animated header logic
const lines = ["D emos"];
function AnimatedDemosHeader() {
  const [displayed, setDisplayed] = useState([""]);
  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    const interval = setInterval(() => {
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
    }, 100);
    return () => clearInterval(interval);
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
      
      <Footer />
    </div>
  );
}

export default Demos;
