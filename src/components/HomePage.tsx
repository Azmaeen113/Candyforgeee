import React, { useState } from "react";
import { FiZap } from "react-icons/fi";
import Button from "./ui/Button";
import { FaTelegramPlane, FaWhatsapp, FaFacebookMessenger, FaLine, FaTwitter, FaLink } from "react-icons/fa";

const socialIcons = [
  { icon: <FaTelegramPlane size={24} />, color: "linear-gradient(135deg, #00F5FF, #0088cc)", name: "telegram" },
  { icon: <FaWhatsapp size={24} />, color: "linear-gradient(135deg, #00FFB3, #25D366)", name: "whatsapp" },
  { icon: <FaFacebookMessenger size={24} />, color: "linear-gradient(135deg, #00F5FF, #0084ff)", name: "messenger" },
  { icon: <FaLine size={24} />, color: "linear-gradient(135deg, #00FFB3, #00B900)", name: "line" },
  { icon: <FaTwitter size={24} />, color: "linear-gradient(135deg, #00F5FF, #1DA1F2)", name: "twitter" },
  { icon: <FaLink size={24} />, color: "linear-gradient(135deg, #B026FF, #FF10F0)", name: "link" },
];

export default function HomePage() {
  const [rotation, setRotation] = useState(0);
  const [balance] = useState(0.00008505);
  const [displayBalance, setDisplayBalance] = useState(0);
  const [hashrate] = useState(3);
  const [displayHashrate, setDisplayHashrate] = useState(0);

  // Animate balance counter
  React.useEffect(() => {
    let start = 0;
    const end = balance;
    if (start === end) return;
    let current = start;
    const increment = (end - start) / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplayBalance(end);
        clearInterval(timer);
      } else {
        setDisplayBalance(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [balance]);

  // Animate hashrate counter
  React.useEffect(() => {
    let start = 0;
    const end = hashrate;
    if (start === end) return;
    let current = start;
    const increment = (end - start) / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplayHashrate(end);
        clearInterval(timer);
      } else {
        setDisplayHashrate(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [hashrate]);

  // Rotate the fan continuously
  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden font-poppins"
      style={{ background: 'linear-gradient(180deg, #1A0B2E 0%, #0A0E27 50%, #1A0B2E 100%)' }}
    >
      {/* Animated Glowing Header */}
      <div className="w-full flex flex-col items-center mb-4 mt-2">
        <div className="relative flex flex-col items-center">
          <div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-2xl opacity-40 animate-pulse-slow z-0"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)' }}
          />
          <img
            src="/main logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="z-10 w-20 h-20 rounded-full shadow-2xl border-4 border-[#00F5FF]/30 animate-float"
          />
          <h1 
            className="z-10 mt-2 text-3xl font-extrabold font-fredoka drop-shadow-lg"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Welcome to Candy Forge!
          </h1>
        </div>
      </div>

      {/* Animated Mining Fan */}
      <div className="relative flex items-center justify-center w-64 h-64 mt-4 mb-8">
        <div
          className="absolute w-full h-full drop-shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.1s linear",
          }}
        >
          <img
            src="/fan.png"
            alt="Forging Fan"
            width={256}
            height={256}
            className="w-full h-full"
          />
        </div>
        <div 
          className="absolute flex items-center justify-center w-20 h-20 rounded-full shadow-xl animate-pulse"
          style={{
            background: 'rgba(26, 11, 46, 0.9)',
            border: '3px solid rgba(0, 245, 255, 0.3)'
          }}
        >
          <img
            src="/main logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </div>
      </div>

      {/* Animated Balance and Hashrate */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in font-fredoka">
          {displayBalance.toFixed(8)} <span style={{ color: '#FFE500' }}>CANDY</span>
        </div>
        <div className="flex items-center gap-2 mb-2 text-lg text-gray-300 animate-fade-in">
          Hashrate: <span className="font-bold" style={{ color: '#00F5FF' }}>{displayHashrate.toFixed(1)} GH/s</span>
          <FiZap className="animate-zap" style={{ color: '#FFE500' }} size={20} />
        </div>
      </div>

      {/* Animated Action Buttons */}
      <div className="grid w-full grid-cols-2 gap-4 mb-8 px-4">
        <Button
          className="h-14 text-lg font-bold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
            boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
          }}
        >
          Claim
        </Button>
        <Button 
          className="h-14 text-lg font-bold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200"
          style={{
            background: 'rgba(45, 27, 78, 0.8)',
            border: '1px solid rgba(0, 245, 255, 0.3)'
          }}
        >
          Booster
        </Button>
      </div>

      {/* Invite Friends Card */}
      <div className="w-full max-w-xl mb-4 animate-fade-in-up px-4">
        <div 
          className="rounded-2xl shadow-2xl p-6"
          style={{
            background: 'rgba(45, 27, 78, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 245, 255, 0.2)'
          }}
        >
          <h2 
            className="mb-1 text-2xl font-bold drop-shadow font-fredoka"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Invite friends
          </h2>
          <p className="mb-4 text-gray-300">
            <span className="font-bold" style={{ color: '#FFE500' }}>+1000 CANDY</span> for each friend you invite
          </p>
          <div className="grid grid-cols-6 gap-3">
            {socialIcons.map((platform) => (
              <button
                key={platform.name}
                className="flex items-center justify-center p-2 rounded-xl shadow-md hover:scale-110 hover:shadow-xl transition-all duration-200"
                style={{ background: platform.color }}
              >
                <span className="text-white animate-social-pop">{platform.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Gradient Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div 
          className="absolute top-0 left-0 w-full h-1/2 blur-2xl animate-bg-fade"
          style={{ background: 'linear-gradient(to bottom right, rgba(0, 245, 255, 0.15), transparent)' }}
        />
        <div 
          className="absolute bottom-0 right-0 w-full h-1/2 blur-2xl animate-bg-fade"
          style={{ background: 'linear-gradient(to top left, rgba(255, 16, 240, 0.15), transparent)' }}
        />
      </div>
    </div>
  );
}
