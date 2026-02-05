import React, { useEffect, useState } from "react";
import "./DailyReward.css";
import { rabbitPhoto, rabbitSmallPhoto } from "./images";
//import StartStore from "./Starstore"; // Import StartStore component
import { useUser } from "./UserContext"; // Import the user context
import { claimDailyRewardFirebase } from "./firebase/services";

interface DailyRewardProps {
  onClose: () => void; // Define the type for the onClose prop
}

const DailyReward: React.FC<DailyRewardProps> = ({ onClose }) => {
  const { userID, setPoints } = useUser();
  const [rewardAmount, setRewardAmount] = useState<number>(0);
  // const [ setShowStartStore] = useState(false); // State to control StartStore visibility

  useEffect(() => {
    const claimDailyReward = async () => {
      try {
        const result = await claimDailyRewardFirebase(userID);
        
        if (result) {
          setRewardAmount(result.reward);
          setPoints(result.newTotal);
        } else {
          // Already claimed today, show 0
          setRewardAmount(0);
        }
      } catch (error) {
        console.error("Error claiming daily reward:", error);
      }
    };

    claimDailyReward();
  }, [userID, setPoints]);

  return (
    <div
      className="daily-reward-container font-poppins"
      style={{
        backgroundImage: `linear-gradient(rgba(26, 11, 46, 0.85), rgba(10, 14, 39, 0.9)), url(${rabbitPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        padding: "0 16px",
        zIndex: 99999999999
      }}
    >
      <div className="mt-8">
        <h1 
          className="title text-3xl font-fredoka"
          style={{ 
            background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}
        >
          Your Daily Record
        </h1>
        <p className="font-normal text-white/80 text-center ">
          Come back tomorrow <br /> for new daily bonus!
        </p>
      </div>
      <div className="reward-amount-container">
        <p 
          className="reward-amount text-center font-fredoka"
          style={{ 
            background: 'linear-gradient(135deg, #FFE500, #00F5FF)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}
        >
          {rewardAmount}
        </p>
        <div className="flex gap-2 items-center justify-center">
          <img
            src={rabbitSmallPhoto}
            alt="logo"
            className="w-[60px] h-[60px] rounded-full"
            style={{ border: '2px solid rgba(0, 245, 255, 0.3)' }}
          />
          <p className="text-white">CANDY Earned</p>
        </div>
      </div>

      {/* 
      <button
        className="bg-[#0075d9] px-10 py-4 rounded-lg font-normal text-white text-[20px]"
        onClick={() => setShowStartStore(true)}
      >
        Boosting Reward
      </button> 
      */}

      <button
        className="rounded-lg font-semibold text-[20px] px-8 py-3 mb-6 transition duration-300 hover:scale-105"
        style={{
          background: 'rgba(45, 27, 78, 0.6)',
          border: '1px solid rgba(0, 245, 255, 0.4)',
          color: '#00F5FF'
        }}
        onClick={onClose}
      >
        Continue
      </button>

      <div className="overflow-hidden">
        {/* {showStartStore && (
          <StartStore onClose={() => setShowStartStore(false)} /> // Render StartStore when button is clicked
        )} */}
      </div>
    </div>
  );
};

export default DailyReward;
