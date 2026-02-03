import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { basicLevelMining, mediumLevelMining, advancedLevelMining } from "../images";
import Modal from "../Modal";

interface ShopItem {
  id: number;
  name: string;
  image: string;
  price: number;
  miningRate: number;
  description: string;
}

const shopItems: ShopItem[] = [
  { 
    id: 2, 
    name: "Level 2 Forge", 
    image: basicLevelMining, 
    price: 1500, 
    miningRate: 20,
    description: "20 CANDY per hour"
  },
  { 
    id: 3, 
    name: "Level 3 Forge", 
    image: basicLevelMining, 
    price: 2500, 
    miningRate: 35,
    description: "35 CANDY per hour"
  },
  { 
    id: 4, 
    name: "Level 4 Forge", 
    image: mediumLevelMining, 
    price: 3500, 
    miningRate: 50,
    description: "50 CANDY per hour"
  },
  { 
    id: 5, 
    name: "Level 5 Forge", 
    image: mediumLevelMining, 
    price: 4500, 
    miningRate: 75,
    description: "75 CANDY per hour"
  },
  { 
    id: 6, 
    name: "Level 6 Forge", 
    image: advancedLevelMining, 
    price: 5000, 
    miningRate: 100,
    description: "100 CANDY per hour"
  },
  { 
    id: 7, 
    name: "Level 7 Forge", 
    image: advancedLevelMining, 
    price: 6000, 
    miningRate: 150,
    description: "150 CANDY per hour"
  },
];

const Shop: React.FC = () => {
  const { userID, points, setPoints } = useUser();
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [currentMiningLevel, setCurrentMiningLevel] = useState<number>(1);

  // Fetch current mining level on component mount
  useEffect(() => {
    const fetchMiningLevel = async () => {
      try {
        const initData = window.Telegram.WebApp.initData || "";
        const response = await fetch(
          `https://frontend.goldenfrog.live/get_user?UserId=${userID}`,
          {
            headers: {
              "X-Telegram-Init-Data": initData
            }
          }
        );
        const data = await response.json();
        if (data.data && data.data.claimedtotal) {
          setCurrentMiningLevel(parseInt(data.data.claimedtotal) || 1);
        }
      } catch (error) {
        console.error("Failed to fetch forging level:", error);
      }
    };

    if (userID) {
      fetchMiningLevel();
    }
  }, [userID]);

  // Function to handle purchase
  const handlePurchase = async (item: ShopItem) => {
    if (points < item.price) {
      setModalMessage("Insufficient CANDY balance");
      return;
    }

    try {
      const initData = window.Telegram.WebApp.initData || "";
      
      // Update backend with new forging level and points
      const response = await fetch(
        "https://frontend.goldenfrog.live/update_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Telegram-Init-Data": initData
          },
          body: JSON.stringify({ 
            UserId: userID, 
            claimedtotal: item.id.toString(),
            totalgot: points - item.price
          })
        }
      );

      if (response.ok) {
        // Update local points and forging level
        setPoints(points - item.price);
        setCurrentMiningLevel(item.id);
        setModalMessage(`Successfully purchased ${item.name}! Your forging rate is now ${item.miningRate} CANDY per hour.`);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      setModalMessage("Transaction failed. Please try again.");
    }
  };

  const closeModal = () => setModalMessage(null);

  return (
    <div 
      className="p-4 font-poppins"
      style={{
        background: 'rgba(45, 27, 78, 0.6)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div className="mb-5">
        <h2 
          className="text-xl font-bold font-fredoka"
          style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Forging Boosters
        </h2>
        <p className="text-sm text-gray-400">Upgrade your forging rate to earn more CANDY!</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {shopItems.map((item) => {
          const isPurchased = item.id <= currentMiningLevel;
          return (
            <div 
              key={item.id} 
              className="relative rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(45, 27, 78, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Item Image */}
              <div 
                className="flex justify-center mb-3 p-3 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 16, 240, 0.1))'
                }}
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
              </div>

              {/* Item Name and Description */}
              <h3 
                className="text-center font-semibold mb-1"
                style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {item.name}
              </h3>
              <p className="text-center text-sm text-gray-400 mb-2">{item.description}</p>

              {/* Price */}
              <div 
                className="text-center font-bold font-fredoka mb-3"
                style={{ color: '#FFE500' }}
              >
                {item.price} CANDY
              </div>

              {/* Purchase Button */}
              <button
                onClick={() => handlePurchase(item)}
                disabled={isPurchased}
                className="w-full rounded-xl py-2 px-4 flex items-center justify-center gap-2 transition-all duration-300 font-semibold"
                style={isPurchased ? {
                  background: 'rgba(100, 100, 100, 0.3)',
                  color: 'rgba(150, 150, 150, 0.8)',
                  cursor: 'not-allowed'
                } : {
                  background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
                  boxShadow: '0 4px 20px rgba(255, 16, 240, 0.3)',
                  color: 'white'
                }}
              >
                {isPurchased ? 'Purchased' : 'Purchase'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Modal component */}
      {modalMessage && (
        <Modal message={modalMessage} onClose={closeModal} />
      )}
    </div>
  );
};

export default Shop;
