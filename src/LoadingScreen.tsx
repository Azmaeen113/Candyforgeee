import React from "react";
import { mainLogo, loadingImage } from "./images";

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden font-poppins">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${loadingImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Candy Forge Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 11, 46, 0.95) 0%, rgba(45, 27, 78, 0.9) 50%, rgba(10, 14, 39, 0.95) 100%)'
        }}
      />
      
      {/* Floating Candy Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: `${Math.random() * 15 + 8}px`,
              height: `${Math.random() * 15 + 8}px`,
              background: ['#00F5FF', '#FF10F0', '#B026FF', '#FFE500', '#00FFB3'][Math.floor(Math.random() * 5)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 4 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Logo with Glow */}
        <div className="mb-8 relative">
          <div 
            className="absolute inset-0 rounded-full blur-2xl opacity-60"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)',
              transform: 'scale(1.5)'
            }}
          />
          <img
            src={mainLogo}
            alt="Candy Forge"
            className="relative w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl object-contain"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(0, 245, 255, 0.5))'
            }}
          />
        </div>

        {/* Brand Name */}
        <h1 
          className="text-3xl md:text-4xl font-bold font-fredoka mb-4"
          style={{
            background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(0, 245, 255, 0.3)'
          }}
        >
          Candy Forge
        </h1>

        {/* Modern Candy Spinning Animation */}
        <div className="relative mb-6">
          {/* Outer candy ring */}
          <div 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full animate-spin"
            style={{
              border: '4px solid transparent',
              borderTopColor: '#00F5FF',
              borderRightColor: '#FF10F0',
              animationDuration: '1.2s'
            }}
          />
          
          {/* Inner candy ring */}
          <div 
            className="absolute top-1 left-1 w-14 h-14 md:top-1 md:left-1 md:w-[72px] md:h-[72px] rounded-full animate-spin"
            style={{ 
              border: '4px solid transparent',
              borderTopColor: '#B026FF',
              borderRightColor: '#FFE500',
              animationDirection: 'reverse', 
              animationDuration: '1.5s' 
            }}
          />
          
          {/* Center glow dot */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.8)'
            }}
          />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-candy-cyan/80 text-sm md:text-base font-medium animate-pulse">
            Forging your sweet experience...
          </p>
        </div>

        {/* Floating candy particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-candy-cyan/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-candy-pink/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-candy-purple/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-candy-yellow/50 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(26, 11, 46, 1), transparent)'
        }}
      />
    </div>
  );
};

export default LoadingScreen;
