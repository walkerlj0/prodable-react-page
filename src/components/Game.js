import React, { useState, useEffect, useCallback } from 'react';
import logo from '../assets/prodable-logo-noback.svg';
import './Game.css';

const LETTERS = ['P', 'R', 'O', 'D', 'A', 'B', 'L', 'E'];
const BASE_OBSTACLE_SPACING = 60; // Base spacing between obstacles

// Function to get random spacing variation
const getRandomSpacing = () => {
  const variations = [
    BASE_OBSTACLE_SPACING * 0.5,  // 50% closer
    BASE_OBSTACLE_SPACING * 0.6,  // 40% closer
    BASE_OBSTACLE_SPACING,        // Normal spacing
    BASE_OBSTACLE_SPACING * 1.1,  // 10% further
    BASE_OBSTACLE_SPACING * 1.2   // 20% further
  ];
  return variations[Math.floor(Math.random() * variations.length)];
};

const Game = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastObstacleTime, setLastObstacleTime] = useState(0);

  const jump = useCallback(() => {
    if (!isJumping && gameStarted && !gameOver) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 1000);
    }
  }, [isJumping, gameStarted, gameOver]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setLastObstacleTime(Date.now());
  }, []);

  const handleInteraction = useCallback((e) => {
    e.preventDefault();
    if (!gameStarted) {
      startGame();
    } else {
      jump();
    }
  }, [gameStarted, startGame, jump]);

  const checkCollision = useCallback((characterBox, obstacleBox) => {
    // Create a smaller hitbox for the character (70% of original size)
    const hitboxReduction = 0.3;
    const hitboxWidth = characterBox.width * hitboxReduction;
    const hitboxHeight = characterBox.height * hitboxReduction;

    const adjustedCharacterBox = {
      left: characterBox.left + (characterBox.width - hitboxWidth) / 2,
      right: characterBox.right - (characterBox.width - hitboxWidth) / 2,
      top: characterBox.top + (characterBox.height - hitboxHeight) / 2,
      bottom: characterBox.bottom - (characterBox.height - hitboxHeight) / 2
    };

    return !(adjustedCharacterBox.right < obstacleBox.left || 
            adjustedCharacterBox.left > obstacleBox.right || 
            adjustedCharacterBox.bottom < obstacleBox.top || 
            adjustedCharacterBox.top > obstacleBox.bottom);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handleInteraction(event);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleInteraction]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setScore(prev => prev + 1);

      const currentTime = Date.now();
      const timeSinceLastObstacle = currentTime - lastObstacleTime;
      
      const lastObstacle = obstacles[obstacles.length - 1];
      const minSpacing = lastObstacle ? getRandomSpacing() : 0;
      const canAddObstacle = obstacles.length === 0 || 
        lastObstacle.left < (100 - minSpacing);

      if (canAddObstacle && timeSinceLastObstacle > 1200 && Math.random() < 0.15) {
        const randomLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
        setObstacles(prev => [...prev, { 
          left: 100, 
          id: Date.now(),
          letter: randomLetter,
          speed: 0.4 + (Math.random() * 0.2 - 0.1)
        }]);
        setLastObstacleTime(currentTime);
      }

      setObstacles(prev => {
        const newObstacles = prev
          .map(obstacle => ({
            ...obstacle,
            left: obstacle.left - obstacle.speed
          }))
          .filter(obstacle => obstacle.left > -10);

        // Check for collisions
        const character = document.querySelector('.character');
        const characterBox = character?.getBoundingClientRect();

        if (characterBox) {
          for (const obstacle of newObstacles) {
            const obstacleElement = document.querySelector(`[data-id="${obstacle.id}"]`);
            const obstacleBox = obstacleElement?.getBoundingClientRect();
            
            if (obstacleBox && checkCollision(characterBox, obstacleBox)) {
              setGameOver(true);
              break;
            }
          }
        }

        return newObstacles;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, obstacles, lastObstacleTime, checkCollision]);

  return (
    <div 
      className="game-container"
      onTouchStart={handleInteraction}
      onClick={handleInteraction}
    >
      <div className="game-area">
        <div className={`character ${isJumping ? 'jump' : ''}`}>
          <img src={logo} alt="Character" style={{ width: '100%', height: '100%' }} />
        </div>
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            data-id={obstacle.id}
            className="obstacle"
            style={{ left: `${obstacle.left}%` }}
          >
            {obstacle.letter}
          </div>
        ))}
        <div className="score">Score: {score}</div>
        {!gameStarted && (
          <div className="start-screen">
            <h2>Prodable Runner</h2>
            <p>Press SPACEBAR or tap/click anywhere to start</p>
            <p>Jump over the letters to survive!</p>
          </div>
        )}
        {gameOver && (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button onClick={startGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
