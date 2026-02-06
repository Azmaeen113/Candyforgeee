import React, { useState, useEffect, useCallback } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FaGamepad, FaTrophy } from 'react-icons/fa';
import { useUser } from '../UserContext';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
  const { points, setPoints } = useUser();
  const [gameScore, setGameScore] = useState(0);
  const [showGame, setShowGame] = useState(false);

  // Listen for score updates from the game iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'GAME_SCORE_UPDATE') {
        setGameScore(event.data.score);
      }
      if (event.data?.type === 'GAME_OVER') {
        // Add game score to main candy score
        const earnedScore = event.data.score || 0;
        if (earnedScore > 0) {
          setPoints((prev: number) => prev + earnedScore);
        }
      }
      if (event.data?.type === 'GAME_EXIT') {
        // User clicked exit in game - close modal and add score
        const earnedScore = event.data.score || 0;
        if (earnedScore > 0) {
          setPoints((prev: number) => prev + earnedScore);
        }
        setShowGame(false);
        setGameScore(0);
        onClose();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setPoints, onClose]);

  const handleClose = useCallback(() => {
    // Add any remaining game score before closing
    if (gameScore > 0) {
      setPoints((prev: number) => prev + gameScore);
    }
    setShowGame(false);
    setGameScore(0);
    onClose();
  }, [gameScore, setPoints, onClose]);

  const handleStartGame = () => {
    setShowGame(true);
    setGameScore(0);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{
        background: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Close Button - Only show on start screen, game has its own exit flow */}
      {!showGame && (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110"
          style={{
            background: 'rgba(45, 27, 78, 0.8)',
            border: '1px solid rgba(255, 16, 240, 0.4)',
            boxShadow: '0 0 20px rgba(255, 16, 240, 0.3)'
          }}
        >
          <RxCross2 className="w-6 h-6 text-white" />
        </button>
      )}

      {!showGame ? (
        // Game Start Screen
        <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center">
          {/* Game Logo/Icon */}
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center mb-6"
            style={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
              boxShadow: '0 0 40px rgba(255, 16, 240, 0.5), 0 0 80px rgba(0, 245, 255, 0.3)'
            }}
          >
            <FaGamepad className="w-16 h-16 text-white" />
          </div>

          {/* Title */}
          <h1 
            className="text-4xl font-bold font-fredoka mb-3"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Candy Forge
          </h1>

          <p className="text-gray-400 mb-2 font-poppins">
            Match candies to earn CANDY rewards!
          </p>

          {/* Current Score Display */}
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(45, 27, 78, 0.6)',
              border: '1px solid rgba(0, 245, 255, 0.3)'
            }}
          >
            <FaTrophy className="w-5 h-5 text-candy-yellow" />
            <span className="text-white font-semibold">Your CANDY: </span>
            <span 
              className="font-bold font-fredoka"
              style={{ color: '#FFE500' }}
            >
              {points.toLocaleString()}
            </span>
          </div>

          {/* Play Button */}
          <button
            onClick={handleStartGame}
            className="px-12 py-4 rounded-2xl font-bold text-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 font-poppins"
            style={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
              boxShadow: '0 8px 30px rgba(255, 16, 240, 0.5), 0 0 60px rgba(255, 16, 240, 0.3)'
            }}
          >
            🎮 Start Game
          </button>

          {/* Instructions */}
          <div 
            className="mt-8 p-4 rounded-xl max-w-sm"
            style={{
              background: 'rgba(45, 27, 78, 0.4)',
              border: '1px solid rgba(0, 245, 255, 0.15)'
            }}
          >
            <p className="text-sm text-gray-400 font-poppins">
              <span className="text-candy-cyan font-semibold">How to play:</span> Swap adjacent candies to match 3 or more of the same type. 
              Your game score will be added to your CANDY balance!
            </p>
          </div>
        </div>
      ) : (
        // Game Container - Full screen iframe, game has its own UI
        <div className="w-full h-full relative">
          {/* Game Iframe - Game has its own header with score */}
          <iframe
            src="/gem-cascade-studio/index.html"
            className="w-full h-full border-0"
            title="Candy Forge Game"
            allow="autoplay"
          />
        </div>
      )}
    </div>
  );
};

export default GameModal;
