import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"; // Import TON UI
import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5"; // Importing back arrow icon
import { useUser } from "./UserContext"; // Import user context to get userID
import { mainLogo } from "./images";
import "./smallstore.css"; // Include your CSS file for custom styling

interface StartStoreProps {
  onClose: () => void; // Function to close the store
}

const StartStore: React.FC<StartStoreProps> = ({ onClose }) => {
  const [tonConnectUI] = useTonConnectUI(); // Getting TonConnect UI instance
  const tonAddress = useTonAddress(); // Getting TON address
  const { userID } = useUser(); // Getting user ID from UserContext

  // State to manage showing a cute message box
  const [message, setMessage] = useState<string | null>(null);

  // Function to handle the buy button click, trigger TON transaction
  const handleBuyClick = async () => {
    try {
      // Check if wallet is connected
      if (!tonAddress) {
        // If not connected, prompt user to connect wallet
        tonConnectUI.connectWallet(); // Use the connectWallet method from TonConnectUI
        setMessage("Wallet connected. Please proceed with the payment.");
        return;
      }

      // Transaction object for TonConnect
      const transaction = {
        validUntil: Date.now() + 5 * 60 * 1000, // Transaction valid for 5 minutes
        messages: [
          {
            address: "UQCaqo5Ftdc8nKxsDGQtmy6DY5isgoQrJYhox0MqCNmN2AJ8", // Replace with the wallet address to send TON to
            amount: "200000000" // Amount in nanoTON (0.2 TON = 200000000 nanoTON)
          }
        ]
      };

      // Request transaction through TonConnect UI
      await tonConnectUI.sendTransaction(transaction);

      // Make API call after successful transaction to update the gamer data
      const initData = window.Telegram.WebApp.initData || "";
      await fetch("https://frontend.goldenfrog.live/update_gamer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Telegram-Init-Data": initData
        },
        body: JSON.stringify({ GamerId: userID, hookspeedtime: 2 })
      });

      // Close the store and show success message
      onClose();
      setMessage("Please come back tomorrow, we will have your reward ready!");
    } catch (error) {
      // Handle transaction failure
      console.error("Transaction failed: ", error);
      setMessage("Please try again, captain!");
    }
  };

  return (
    <div 
      className="start-store-overlay font-poppins"
      style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)' }}
    >
      <div 
        className="start-store-container rounded-2xl"
        style={{
          background: 'rgba(45, 27, 78, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 245, 255, 0.3)'
        }}
      >
        <div className="start-store-header">
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(0, 245, 255, 0.1)',
              border: '1px solid rgba(0, 245, 255, 0.3)'
            }}
          >
            <IoArrowBackSharp className="text-[#00F5FF] text-xl" />
          </button>
          <h2 
            className="store-title font-fredoka"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Increase the star reward with small TON
          </h2>
        </div>

        <div 
          className="reward-card rounded-2xl"
          style={{
            background: 'rgba(45, 27, 78, 0.8)',
            border: '1px solid rgba(0, 245, 255, 0.2)'
          }}
        >
          <div>
            <div className="flex items-center justify-center flex-col gap-3 mb-3">
              <div 
                className="w-[95px] h-[95px] rounded-full p-[3px]"
                style={{ background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)' }}
              >
                <img 
                  src={mainLogo} 
                  alt="logo" 
                  className="w-full h-full rounded-full object-cover"
                  style={{ background: '#1A0B2E' }}
                />
              </div>
              <div className="flex items-center justify-center text-center flex-col">
                <h1 
                  className="font-bold text-[28px] font-fredoka"
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  2X
                </h1>
                <p className="font-semibold text-white">Your Daily Reward!!</p>
              </div>
            </div>
          </div>
          <p className="reward-text text-gray-300">
            2X reward only for 0.2 TON
          </p>
          <button
            className="px-6 rounded-xl py-3 text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
              boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
            }}
            onClick={handleBuyClick}
          >
            Buy Now
          </button>
        </div>

        {message && (
          <div 
            className="message-box rounded-xl p-3 mt-4"
            style={{
              background: 'rgba(0, 245, 255, 0.1)',
              border: '1px solid rgba(0, 245, 255, 0.3)',
              color: '#00F5FF'
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartStore;
