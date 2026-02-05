import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import "./App.css";
import { mainLogo } from "./images";
import { RxCross2 } from "react-icons/rx";
import Modal from "./Modal";

import { IoMdWallet,  } from "react-icons/io";
import {
  FaChevronRight,
  FaCopy,
  //FaExchangeAlt,
  FaExternalLinkAlt,
  FaInfoCircle
} from "react-icons/fa";
import { getUserById, updateWalletAddress } from "./firebase/services";

interface AirdropProps {}

const Airdrop: React.FC<AirdropProps> = () => {
  const { userID, points, setTrd } = useUser();
  const [showSetWalletModal, setShowSetWalletModal] = useState(false);
  const [showWhatIsModal, setShowWhatIsModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [newWalletAddress, setNewWalletAddress] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userID) return;
      setIsLoading(true);
      try {
        const user = await getUserById(userID);
        
        if (user) {
          if (user.walletAddress) {
            setWalletAddress(user.walletAddress);
          }
          if (user.claimedtotal !== undefined) {
            setTrd(user.claimedtotal || 0);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userID, setTrd]);

  // Handle saving wallet address
  const handleSaveWalletAddress = async () => {
    if (!newWalletAddress.trim()) {
      setModalMessage("Please enter a valid wallet address");
      return;
    }

    try {
      await updateWalletAddress(userID, newWalletAddress.trim());
      
      setWalletAddress(newWalletAddress.trim());
      setNewWalletAddress("");
      setShowSetWalletModal(false);
      setModalMessage("Wallet address saved successfully!");
    } catch (error) {
      console.error("Error saving wallet address:", error);
      setModalMessage("Failed to save wallet address. Please try again.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setModalMessage("Wallet address copied to clipboard!");
  };

  const closeModal = () => setModalMessage(null);

  // Calculate the divided balance (divided by 10)
  const dividedBalance = points / 10;

  return (
    <div 
      className="relative min-h-screen text-gray-200 z-10 font-poppins"
      style={{ background: 'linear-gradient(180deg, #1A0B2E 0%, #0A0E27 50%, #1A0B2E 100%)' }}
    >
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#FF10F0]/10 to-transparent z-0"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-[#00F5FF]/10 to-transparent z-0"></div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col min-h-screen overflow-x-hidden px-5 py-8">
        {/* Header */}
        <div className="mb-6 mt-4 relative">
          <div className="relative flex flex-col items-center mt-4">
            <div 
              className="w-full max-w-[328px] rounded-3xl shadow-lg mb-4 overflow-hidden"
              style={{
                background: 'rgba(45, 27, 78, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(255, 16, 240, 0.2)',
                margin: '20px 0'
              }}
            >
              <img 
                src="/banners/wallet page banner.png" 
                alt="Wallet Header" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div 
              className="flex items-center justify-center mt-1 space-x-1 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(45, 27, 78, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 245, 255, 0.2)'
              }}
            >
              <FaInfoCircle className="w-4 h-4 text-[#00F5FF]" />
              <p className="text-sm text-gray-200">
                Manage your candy rewards
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Balance Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center font-fredoka">
            <IoMdWallet className="w-5 h-5 mr-2 text-[#00F5FF]" />
            Wallet Balance
          </h2>

          {isLoading ? (
            <div className="space-y-2">
              <div 
                className="rounded-xl p-4 animate-pulse"
                style={{
                  background: 'rgba(45, 27, 78, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 245, 255, 0.2)'
                }}
              >
                <div className="h-6 bg-[#2D1B4E] rounded w-1/3 mb-4"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#2D1B4E]"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-[#2D1B4E] rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-[#2D1B4E] rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              <div 
                className="rounded-xl p-4 animate-pulse"
                style={{
                  background: 'rgba(45, 27, 78, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 245, 255, 0.2)'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-[#2D1B4E]"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-[#2D1B4E] rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-[#2D1B4E] rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* CANDY Balance Card */}
              <div className="relative group">
                <div 
                  className="absolute -inset-[1px] rounded-xl opacity-30 group-hover:opacity-60 transition duration-300 blur-sm"
                  style={{ background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)' }}
                ></div>
                <div 
                  className="relative rounded-xl p-5 shadow-xl"
                  style={{
                    background: 'rgba(45, 27, 78, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 245, 255, 0.3)'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="text-sm font-medium"
                      style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      CANDY Balance
                    </div>
                    <div 
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 16, 240, 0.2))',
                        border: '1px solid rgba(0, 245, 255, 0.3)',
                        color: '#00F5FF'
                      }}
                    >
                      Reward Token
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden p-[2px]"
                          style={{ background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)' }}
                        >
                          <div className="w-full h-full rounded-full bg-[#1A0B2E] flex items-center justify-center">
                            <img
                              src={mainLogo || "/placeholder.svg"}
                              alt="CANDY Token"
                              className="h-10 w-10 object-cover rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div 
                          className="text-3xl font-bold font-fredoka"
                          style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                        >
                          {dividedBalance.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Real reward (divided by 10)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Division Notice */}
                  <div 
                    className="mt-4 rounded-lg p-3"
                    style={{
                      background: 'rgba(255, 229, 0, 0.1)',
                      border: '1px solid rgba(255, 229, 0, 0.3)'
                    }}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <FaInfoCircle className="w-4 h-4 text-[#FFE500]" />
                      <p className="text-sm font-medium text-[#FFE500]">Reward Division</p>
                    </div>
                    <p className="text-sm text-gray-300">
                      Your total balance of {points.toLocaleString()} CANDY will be divided by 10 for the real reward payout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Receiving Wallet Section */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center font-fredoka">
            <IoMdWallet className="w-5 h-5 mr-2 text-[#FF10F0]" />
            Receiving Wallet
          </h2>

          <div className="relative group">
            <div 
              className="absolute -inset-[1px] rounded-xl opacity-30 group-hover:opacity-60 transition duration-300 blur-sm"
              style={{ background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)' }}
            ></div>
            <div 
              className="relative rounded-xl p-5 shadow-xl"
              style={{
                background: 'rgba(45, 27, 78, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 245, 255, 0.3)'
              }}
            >
              {walletAddress ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Wallet Address
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(walletAddress)}
                        className="p-2 rounded-lg transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(0, 245, 255, 0.1)',
                          border: '1px solid rgba(0, 245, 255, 0.3)'
                        }}
                      >
                        <FaCopy className="w-4 h-4 text-[#00F5FF]" />
                      </button>
                      <button
                        onClick={() => setShowSetWalletModal(true)}
                        className="p-2 rounded-lg transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(255, 16, 240, 0.1)',
                          border: '1px solid rgba(255, 16, 240, 0.3)'
                        }}
                      >
                        <FaExternalLinkAlt className="w-4 h-4 text-[#FF10F0]" />
                      </button>
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-lg break-all"
                    style={{
                      background: 'rgba(45, 27, 78, 0.6)',
                      border: '1px solid rgba(0, 245, 255, 0.2)'
                    }}
                  >
                    <p className="text-sm text-gray-300 font-mono">
                      {walletAddress}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowSetWalletModal(true)}
                    className="text-sm transition-colors flex items-center"
                    style={{ color: '#00F5FF' }}
                  >
                    Update Address
                    <FaChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 space-y-3">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(45, 27, 78, 0.8)',
                      border: '1px solid rgba(0, 245, 255, 0.2)'
                    }}
                  >
                    <IoMdWallet className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-center">
                    No wallet address set
                  </p>
                  <button
                    onClick={() => setShowSetWalletModal(true)}
                    className="px-5 py-3 rounded-xl text-white font-semibold text-sm flex items-center space-x-1 transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
                      boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
                    }}
                  >
                    <IoMdWallet className="w-4 h-4 mr-1" />
                    Set Wallet Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* What is CANDY Modal */}
      {showWhatIsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60">
          <div className="relative w-[90%] max-w-md">
            <div 
              className="absolute -inset-[2px] rounded-2xl opacity-50 blur-sm"
              style={{ background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)' }}
            ></div>
            <div 
              className="relative rounded-2xl shadow-2xl overflow-hidden"
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
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 16, 240, 0.2))' }}
                  >
                    <FaInfoCircle className="w-5 h-5 text-[#00F5FF]" />
                  </div>
                  <h2 
                    className="text-xl font-bold font-fredoka"
                    style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    What is CANDY?
                  </h2>
                </div>
                <button
                  onClick={() => setShowWhatIsModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(255, 16, 240, 0.2)',
                    border: '1px solid rgba(255, 16, 240, 0.3)'
                  }}
                >
                  <RxCross2 size={20} className="text-[#FF10F0]" />
                </button>
              </div>

              <div className="p-5">
                <div 
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(45, 27, 78, 0.6)',
                    border: '1px solid rgba(0, 245, 255, 0.2)'
                  }}
                >
                  <p className="text-gray-300 leading-relaxed">
                    CANDY is the core token of the Candy Forge platform,
                    representing the digital asset value of the platform. It's
                    not only the rewards you earn in the game but also can be
                    used to upgrade your forge and improve efficiency. By 
                    continuously earning CANDY, you can convert it
                    for additional rewards!
                  </p>
                </div>

                <div 
                  className="mt-4 rounded-xl p-3"
                  style={{
                    background: 'rgba(0, 245, 255, 0.1)',
                    border: '1px solid rgba(0, 245, 255, 0.3)'
                  }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <FaInfoCircle className="w-4 h-4 text-[#00F5FF]" />
                    <p className="text-sm font-medium text-[#00F5FF]">Conversion Rate</p>
                  </div>
                  <p className="text-sm text-gray-300">1000 CANDY = 1 Token</p>
                </div>

                <button
                  onClick={() => setShowWhatIsModal(false)}
                  className="w-full mt-5 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
                    boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
                  }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set/Update Wallet Modal */}
      {showSetWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60">
          <div className="relative w-[90%] max-w-md">
            <div 
              className="absolute -inset-[2px] rounded-2xl opacity-50 blur-sm"
              style={{ background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)' }}
            ></div>
            <div 
              className="relative rounded-2xl shadow-2xl overflow-hidden"
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
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 16, 240, 0.2))' }}
                  >
                    <IoMdWallet className="w-5 h-5 text-[#FF10F0]" />
                  </div>
                  <h2 
                    className="text-xl font-bold font-fredoka"
                    style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {walletAddress
                      ? "Update Wallet Address"
                      : "Set Wallet Address"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowSetWalletModal(false);
                    setNewWalletAddress("");
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(255, 16, 240, 0.2)',
                    border: '1px solid rgba(255, 16, 240, 0.3)'
                  }}
                >
                  <RxCross2 size={20} className="text-[#FF10F0]" />
                </button>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">
                    Wallet Address
                  </label>
                  <textarea
                    value={newWalletAddress}
                    onChange={(e) => setNewWalletAddress(e.target.value)}
                    placeholder="Enter your wallet address"
                    className="w-full min-h-[100px] text-white px-4 py-3 rounded-xl focus:outline-none placeholder-gray-500 transition-all duration-300"
                    style={{
                      background: 'rgba(45, 27, 78, 0.8)',
                      border: '1px solid rgba(0, 245, 255, 0.3)'
                    }}
                  ></textarea>
                </div>

                <div 
                  className="rounded-xl p-3 mb-5"
                  style={{
                    background: 'rgba(0, 245, 255, 0.1)',
                    border: '1px solid rgba(0, 245, 255, 0.3)'
                  }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <FaInfoCircle className="w-4 h-4 text-[#00F5FF]" />
                    <p className="text-sm font-medium text-[#00F5FF]">Important</p>
                  </div>
                  <p className="text-sm text-gray-300">
                    Make sure to enter a valid wallet address. Your
                    rewards will be sent to this address.
                  </p>
                </div>

                <button
                  onClick={handleSaveWalletAddress}
                  className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
                    boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
                  }}
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Modal */}
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default Airdrop;
