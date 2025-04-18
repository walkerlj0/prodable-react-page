import React from 'react';
import Game from '../components/Game';
import Footer from '../components/Footer';

function Demos() {
  return (
    <div className="page">
      <h1>Prodable Runner</h1>
      <p>Help the Prodable logo jump over obstacles! Press spacebar to start and jump.</p>
      <Game />
      <Footer />
    </div>
  );
}

export default Demos;
