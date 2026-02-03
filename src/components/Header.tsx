import React from "react";
import { walletImage, woodLeague } from "../images";

import { FaAngleRight } from "react-icons/fa6";
import { useTonConnectUI } from "@tonconnect/ui-react";

interface HeaderProps {
  address: string;
  setActivePage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  address,
  setActivePage
}) => {
  const [tonConnectUI] = useTonConnectUI();

  return (
    <header className="relative w-full px-3 mt-4 font-poppins">
      <div className="flex flex-row items-center justify-between w-full">
        {/* League Button - Candy Style */}
        <div 
          className="p-1 rounded-2xl"
          style={{
            background: 'rgba(45, 27, 78, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 245, 255, 0.1)'
          }}
        >
          <button
            onClick={() => setActivePage("league")}
            className="self-start p-2 rounded-xl text-xs text-white flex gap-2 justify-center items-center transition-all duration-300 group hover:bg-candy-cyan/10"
          >
            <div className="relative">
              <img 
                src={woodLeague} 
                className="w-[26px] h-[26px] group-hover:scale-110 transition-transform duration-300" 
                alt="League" 
              />
              <div 
                className="absolute -inset-1 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(0, 245, 255, 0.3)' }}
              />
            </div>
            <span 
              className="font-semibold transition-colors duration-300"
              style={{
                background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Wood
            </span>
            <FaAngleRight 
              className="group-hover:translate-x-1 transition-transform duration-300"
              style={{ color: '#00F5FF' }}
            />
          </button>
        </div>

        {/* Wallet Button - Candy Style */}
        <div 
          className="p-1 rounded-2xl"
          style={{
            background: 'rgba(45, 27, 78, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 16, 240, 0.2)',
            boxShadow: '0 4px 20px rgba(255, 16, 240, 0.1)'
          }}
        >
          <button
            onClick={() => {
              if (address) {
                tonConnectUI.disconnect();
              } else {
                tonConnectUI.connectWallet();
              }
            }}
            className="flex items-center justify-center p-2 rounded-xl transition-all duration-300 group hover:bg-candy-pink/10"
          >
            {address ? (
              <span 
                className="text-xs font-bold px-2 transition-colors duration-300"
                style={{
                  background: 'linear-gradient(135deg, #FF10F0, #B026FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Disconnect
              </span>
            ) : (
              <>
                <img 
                  src={walletImage} 
                  className="w-[24px] h-[24px] group-hover:scale-110 transition-transform duration-300" 
                  alt="Wallet" 
                />
                <span 
                  className="flex items-center gap-1 text-xs font-bold px-2 transition-colors duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #FF10F0, #B026FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Connect Wallet
                  <FaAngleRight 
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: '#FF10F0' }}
                  />
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
