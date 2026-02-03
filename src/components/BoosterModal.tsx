import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaX } from "react-icons/fa6";
import {
  advancedLevelMining,
  basicLevelMining,
  mediumLevelMining
} from "../images";

interface BoosterModalProps {
  onClose: () => void;
  onRentMiner: () => void;
}

const miners = [
  {
    id: 1,
    name: "Basic Forge",
    image: basicLevelMining
  },
  {
    id: 2,
    name: "Advanced Forge",
    image: mediumLevelMining
  },
  {
    id: 3,
    name: "Premium Forge",
    image: advancedLevelMining
  }
];

export default function BoosterModal({
  onClose,
  onRentMiner
}: BoosterModalProps) {
  const [selectedMiner, setSelectedMiner] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const dailyProfit = 0.667008;
  const rentPeriod = 30;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const totalProfit = dailyProfit * rentPeriod;
  const rentPrice = 100000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60 font-poppins">
      <div className="relative w-[90%] max-w-md">
        {/* Gradient border glow */}
        <div 
          className="absolute -inset-[2px] rounded-2xl opacity-60 blur-sm"
          style={{ background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)' }}
        ></div>
        
        <div 
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(26, 11, 46, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 245, 255, 0.3)'
          }}
        >
          <div 
            className="flex items-center justify-between p-5"
            style={{ borderBottom: '1px solid rgba(0, 245, 255, 0.2)' }}
          >
            <h2 
              className="text-2xl font-bold font-fredoka"
              style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Booster
            </h2>
            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255, 16, 240, 0.2)',
                border: '1px solid rgba(255, 16, 240, 0.3)'
              }}
            >
              <FaX size={14} className="text-[#FF10F0]" />
            </button>
          </div>

          <div className="p-5">
            <div className="flex justify-between gap-3 mb-6">
              {miners.map((miner) => (
                <button
                  key={miner.id}
                  className="flex items-center justify-center p-3 rounded-xl transition-all duration-300"
                  style={{
                    background: selectedMiner === miner.id 
                      ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 16, 240, 0.2))'
                      : 'rgba(45, 27, 78, 0.6)',
                    border: selectedMiner === miner.id 
                      ? '2px solid #FF10F0'
                      : '1px solid rgba(0, 245, 255, 0.2)',
                    boxShadow: selectedMiner === miner.id 
                      ? '0 4px 20px rgba(255, 16, 240, 0.3)'
                      : 'none'
                  }}
                  onClick={() => setSelectedMiner(miner.id)}
                >
                  <img
                    src={miner.image || "/placeholder.svg"}
                    alt={miner.name}
                    className="h-full w-full"
                  />
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="text-gray-400 font-normal text-[15px]">
                  Rent Period
                </div>
                <div className="font-medium text-white">{rentPeriod} days</div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center text-gray-400 font-normal text-[15px]">
                  Daily profit
                </div>
                <div 
                  className="font-semibold"
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {dailyProfit.toFixed(6)} CANDY
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center text-gray-400 font-normal text-[15px]">
                  Total profit
                </div>
                <div 
                  className="font-semibold"
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {totalProfit.toFixed(5)} CANDY
                </div>
              </div>

              <div>
                <div className="mb-2 text-gray-400 font-normal text-[15px]">
                  Quantity
                </div>
                <div 
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{
                    background: 'rgba(45, 27, 78, 0.6)',
                    border: '1px solid rgba(0, 245, 255, 0.2)'
                  }}
                >
                  <button
                    onClick={decreaseQuantity}
                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(0, 245, 255, 0.2)',
                      border: '1px solid rgba(0, 245, 255, 0.3)'
                    }}
                  >
                    <BiMinus size={20} className="text-[#00F5FF]" />
                  </button>
                  <div 
                    className="text-2xl font-bold font-fredoka"
                    style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255, 16, 240, 0.2)',
                      border: '1px solid rgba(255, 16, 240, 0.3)'
                    }}
                  >
                    <BiPlus size={20} className="text-[#FF10F0]" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <div 
                  className="font-semibold"
                  style={{ color: '#FF10F0' }}
                >
                  Rent Price
                </div>
                <div 
                  className="font-bold font-fredoka"
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {(rentPrice * quantity).toLocaleString()} CANDY
                </div>
              </div>
            </div>

            <button
              onClick={onRentMiner}
              className="w-full h-14 rounded-xl text-white mt-6 text-lg font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
                boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
              }}
            >
              Rent Forge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
