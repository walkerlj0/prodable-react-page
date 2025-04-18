import React from 'react';
import Game from '../components/Game';
import Footer from '../components/Footer';
import './Demos.css';

function Demos() {
  return (
    <div className="page">
      <div className="demos-header">
        <h1 className="demos-animated-header">Interactive Demos</h1>
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
