import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { bannerLogo } from '../images';

interface WelcomeBannerProps {
  onClose?: () => void;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Animate in after component mounts
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'rgba(10, 5, 20, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Floating candy particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              background: ['#00F5FF', '#FF10F0', '#B026FF', '#FFE500'][Math.floor(Math.random() * 4)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `candyFloat ${Math.random() * 4 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Banner Container */}
      <div 
        className={`relative max-w-sm w-[90%] mx-4 transition-all duration-500 ${
          isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
          style={{
            background: 'linear-gradient(135deg, #FF10F0, #B026FF)',
            boxShadow: '0 4px 20px rgba(255, 16, 240, 0.5)',
          }}
        >
          <IoClose className="w-6 h-6 text-white" />
        </button>

        {/* Banner Card */}
        <div 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(45, 27, 78, 0.9), rgba(26, 11, 46, 0.95))',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.3), 0 0 80px rgba(255, 16, 240, 0.2)',
          }}
        >
          {/* Gradient Border Effect */}
          <div 
            className="absolute inset-0 rounded-3xl -z-10"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)',
              margin: '-2px',
            }}
          />

          {/* Banner Content */}
          <div className="p-6">
            {/* Banner Logo */}
            <div className="flex justify-center mb-4">
              <img 
                src={bannerLogo} 
                alt="Candy Forge Banner" 
                className="w-full max-w-[280px] h-auto object-contain rounded-xl"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(0, 245, 255, 0.3))',
                }}
              />
            </div>

            {/* Welcome Text */}
            <div className="text-center space-y-3">
              <h2 
                className="text-2xl font-bold font-fredoka"
                style={{
                  background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(0, 245, 255, 0.3)',
                }}
              >
                Welcome to Candy Forge!
              </h2>
              <p className="text-gray-300 text-sm font-poppins leading-relaxed">
                Tap, earn, and forge your way to sweet rewards. Your candy adventure begins now!
              </p>
            </div>

            {/* Start Button */}
            <button
              onClick={handleClose}
              className="w-full mt-6 py-4 rounded-2xl font-semibold text-white font-poppins transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
                boxShadow: '0 4px 24px rgba(255, 16, 240, 0.4)',
              }}
            >
              Start Forging
            </button>
          </div>

          {/* Shimmer Effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s infinite',
            }}
          />
        </div>
      </div>

      {/* Keyframes for candy float animation */}
      <style>{`
        @keyframes candyFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(10deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-10deg);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeBanner;
