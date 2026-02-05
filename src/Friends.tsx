import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { useUser } from "./UserContext";
import { click, telegramImage /*, tgStar*/ } from "./images";
import { RxCross2 } from "react-icons/rx";
import {
  FaAward,
  FaChevronRight,
  // FaComments,
  FaCopy,
  FaShare,
  FaUsers,
} from "react-icons/fa";

import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import {
  FaFacebookMessenger,
  FaHandSparkles,
  FaMessage,
  FaXTwitter,
} from "react-icons/fa6";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { LuLink } from "react-icons/lu";
import { getInvitations, updateReferrewarded as updateReferrewardedFirebase, increaseCoins } from "./firebase/services";

const FriendsPage: React.FC = () => {
  const { userID, setPoints } = useUser();
  const [friends, setFriends] = useState<
    Array<{ Username: string; totalgot: number }>
  >([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null); // Modal state
  const FRIEND_REWARD = 1000; // Points reward per new friend
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const inviteModalRef = useRef<HTMLDivElement | null>(null);
  const [animateModal, setAnimateModal] = useState(false); // Animation trigger
  const [isLoading, setIsLoading] = useState(true);

  // Invitation link - Update this to your Telegram bot when ready
  const invitationLink = `https://t.me/CandyForgeBot/CandyForge?startapp=${encodeURIComponent(
    userID
  )}`;

  const shareButtons = [
    {
      icon: <FaTelegramPlane size={19} />,
      label: "Telegram",
      color: "#0088cc",
      onClick: () =>
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(invitationLink)}`,
          "_blank"
        ),
    },
    {
      icon: <IoLogoWhatsapp size={19} />,
      label: "WhatsApp",
      color: "#25D366",
      onClick: () =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(invitationLink)}`,
          "_blank"
        ),
    },
    {
      icon: <FaFacebookMessenger size={19} />,
      label: "Facebook",
      color: "#0084ff",
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            invitationLink
          )}`,
          "_blank"
        ),
    },
    {
      icon: <HiOutlineChatBubbleBottomCenter size={19} />,
      label: "Line",
      color: "#00B900",
      onClick: () =>
        window.open(
          `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
            invitationLink
          )}`,
          "_blank"
        ),
    },
    {
      icon: <FaXTwitter size={19} />,
      label: "Twitter",
      color: "black",
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            invitationLink
          )}`,
          "_blank"
        ),
    },
    {
      icon: <LuLink size={19} />,
      label: "Copy Link",
      color: "gray",
      onClick: () => {
        navigator.clipboard.writeText(invitationLink);
        showModal("Invitation link copied to clipboard!");
      },
    },
  ];

  const handleInvite = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(invitationLink)}`,
      "_blank"
    );
  };

  const setupInvitationLinkCopy = () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = invitationLink;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    showModal("Invitation link copied to clipboard!");
  };

  const showModal = (message: string) => {
    setModalMessage(message);
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  // Function to update the `referrewarded` count
  const updateReferrewarded = async (newReferrewardedCount: number) => {
    try {
      await updateReferrewardedFirebase(userID, newReferrewardedCount);
      console.log("referrewarded updated to", newReferrewardedCount);
    } catch (error) {
      console.error("Failed to update referrewarded:", error);
    }
  };

  // Fetch friends logic
  const fetchFriends = async () => {
    setIsLoading(true);
    try {
      const data = await getInvitations(userID);

      if (data) {
        const invitations = data.invitations || [];
        const totalFriendsCount = invitations.length;
        const referrewardedCount = data.referrewarded || 0;

        // Transform Firebase user data to match expected format
        const friendsList = invitations.map((user) => ({
          Username: user.odl_username || user.odl_first_name || "Unknown",
          totalgot: user.coins || 0,
        }));

        setFriends(friendsList);
        localStorage.setItem(`friends_${userID}`, JSON.stringify(friendsList));

        if (totalFriendsCount > referrewardedCount) {
          const newUnrewardedFriends = totalFriendsCount - referrewardedCount;
          const rewardPoints = newUnrewardedFriends * FRIEND_REWARD;

          // Update coins in Firebase and local state
          const newTotal = await increaseCoins(userID, rewardPoints);
          setPoints(newTotal);
          showModal(
            `You have earned ${rewardPoints} points for inviting ${newUnrewardedFriends} new friends!`
          );

          await updateReferrewarded(totalFriendsCount);
        }
      } else {
        setFriends([]);
        localStorage.removeItem(`friends_${userID}`);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching friends:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch friends on load
  useEffect(() => {
    if (userID) {
      const localFriends = localStorage.getItem(`friends_${userID}`);
      if (localFriends) {
        setFriends(JSON.parse(localFriends));
        setIsLoading(false);
      }
      fetchFriends();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  // Handle modal animation
  useEffect(() => {
    if (isInviteModalOpen) {
      setTimeout(() => setAnimateModal(true), 50);
    } else {
      setTimeout(() => setAnimateModal(false), 50);
    }
  }, [isInviteModalOpen]);

  // Function to get a random gradient for user avatars
  const getRandomGradient = (username: string) => {
    const gradients = [
      "from-candy-cyan to-candy-pink",
      "from-candy-pink to-candy-purple",
      "from-candy-purple to-candy-cyan",
      "from-candy-yellow to-candy-pink",
      "from-candy-green to-candy-cyan",
      "from-candy-cyan to-candy-purple",
    ];

    // Use the first character of username to deterministically select a gradient
    const charCode = username.charCodeAt(0);
    const index = charCode % gradients.length;

    return gradients[index];
  };

  // const fakeFriends = [
  //   {
  //     Username: "JohnDoe"
  //   },
  //   {
  //     Username: "JaneSmith"
  //   }
  // ];

  return (
    <div 
      className="relative min-h-screen text-gray-200 z-10 font-poppins"
      style={{ background: 'linear-gradient(180deg, #1A0B2E 0%, #0A0E27 50%, #1A0B2E 100%)' }}
    >
      {/* Candy gradient overlays */}
      <div 
        className="absolute top-0 left-0 w-full h-64 z-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0, 245, 255, 0.1), transparent)' }}
      />
      <div 
        className="absolute bottom-0 right-0 w-full h-64 z-0"
        style={{ background: 'linear-gradient(to top, rgba(255, 16, 240, 0.1), transparent)' }}
      />
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col h-full gap-6 pb-20 overflow-y-scroll overflow-x-hidden hide-scrollbar px-4">
        {/* Header Section */}
        <div className="mt-8 z-40 w-full">
          <div className="mb-8 relative">
            <div className="relative flex flex-col items-center mt-4">
              <div 
                className="relative rounded-3xl overflow-hidden w-full max-w-[328px]"
                style={{ boxShadow: '0 8px 40px rgba(0, 245, 255, 0.2)', margin: '20px 0' }}
              >
                <img 
                  src="/banners/friends page banner.png" 
                  alt="Friends Header" 
                  className="w-full h-auto object-cover rounded-3xl"
                />
                {/* Shimmer overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s infinite'
                  }}
                />
              </div>
              <div 
                className="flex items-center justify-center mt-4 space-x-2 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(45, 27, 78, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 245, 255, 0.2)'
                }}
              >
                <FaAward className="w-4 h-4 text-candy-yellow" />
                <p className="text-sm text-gray-300">
                  Earn CANDY by inviting friends
                </p>
              </div>
            </div>
          </div>

          {/* Invite Friends Card */}
          <div className="w-full mb-6 transform transition-all duration-300 hover:scale-[1.02]">
            <div className="relative">
              <div 
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(45, 27, 78, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 245, 255, 0.2)'
                }}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 16, 240, 0.2))',
                            border: '2px solid rgba(0, 245, 255, 0.3)'
                          }}
                        >
                          <img
                            src={telegramImage || "/placeholder.svg"}
                            alt="Invite Friends"
                            className="h-10 w-10 object-cover"
                          />
                        </div>
                        <div 
                          className="absolute -inset-1 rounded-full animate-pulse"
                          style={{ border: '1px solid rgba(0, 245, 255, 0.3)' }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-xl font-semibold text-white">
                            Invite Friends
                          </p>
                          <FaHandSparkles className="w-4 h-4 text-candy-yellow" />
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <div 
                            className="px-3 py-1 rounded-full flex items-center space-x-1"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(255, 16, 240, 0.15))',
                              border: '1px solid rgba(0, 245, 255, 0.3)'
                            }}
                          >
                            <p 
                              className="text-sm font-medium"
                              style={{
                                background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                              }}
                            >
                              +1000 CANDY per friend
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share button */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="relative text-white text-base w-full py-4 rounded-2xl transition-all duration-300 font-medium flex items-center justify-center space-x-2 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
              boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
            }}
          >
            <FaShare className="w-5 h-5 mr-2" />
            <span>Share with friends</span>
            <img
              src={click || "/placeholder.svg"}
              alt=""
              className="absolute w-10 -right-2 -bottom-[5px] click-animate"
            />
          </button>
        </div>

        {/* Direct share buttons */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {shareButtons.map((button, idx) => (
            <button
              key={idx}
              onClick={button.onClick}
              className="flex flex-col items-center justify-center space-y-2 p-3 rounded-2xl transition-all duration-300 shadow-md hover:scale-105"
              style={{
                background: 'rgba(45, 27, 78, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 245, 255, 0.15)'
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: button.color }}
              >
                <span className="text-white">{button.icon}</span>
              </div>
              <span className="text-xs text-gray-300">{button.label}</span>
            </button>
          ))}
        </div>

        {/* Friends list */}
        <div className="w-full relative">
          <div 
            className="absolute -inset-[0.5px] rounded-2xl blur-sm opacity-30"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)' }}
          />
          <div 
            className="relative rounded-2xl p-5"
            style={{
              background: 'rgba(45, 27, 78, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 245, 255, 0.15)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 16, 240, 0.2))'
                  }}
                >
                  <FaUsers className="w-5 h-5 text-candy-cyan" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    My Friends ({friends.length})
                  </h2>
                  <p className="text-xs text-gray-400">Invited forgers</p>
                </div>
              </div>
            </div>

            {isLoading ? (
              // Loading skeleton with candy colors
              <div className="space-y-3">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl animate-pulse"
                    style={{ background: 'rgba(45, 27, 78, 0.5)' }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-forge-royal"></div>
                      <div className="h-4 w-24 bg-forge-royal rounded"></div>
                    </div>
                    <div className="h-4 w-16 bg-forge-royal rounded"></div>
                  </div>
                ))}
              </div>
            ) : friends.length > 0 ? (
              <div className="space-y-3">
                {friends.map((friend, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: 'rgba(45, 27, 78, 0.5)',
                      border: '1px solid rgba(0, 245, 255, 0.1)'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${getRandomGradient(
                          friend.Username
                        )} shadow-md`}
                      >
                        <span className="text-white font-semibold font-fredoka">
                          {friend.Username.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {friend.Username}
                        </p>
                        <p className="text-xs text-gray-400">Active forger</p>
                      </div>
                    </div>
                    <div 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(255, 16, 240, 0.15))',
                        border: '1px solid rgba(0, 245, 255, 0.2)',
                        color: '#00F5FF'
                      }}
                    >
                      +1000 CANDY
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(45, 27, 78, 0.8)' }}
                >
                  <FaUsers className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400 text-center">
                  No friends invited yet
                </p>
                <p className="text-xs text-gray-500 text-center max-w-xs">
                  Share your invitation link to start earning CANDY rewards
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast-style modal */}
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}

      {/* Bottom-sheet invite modal */}
      {isInviteModalOpen && (
        <>
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              animateModal ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsInviteModalOpen(false)}
          />

          <div
            ref={inviteModalRef}
            className={`fixed left-1/2 bottom-0 transform -translate-x-1/2 md:max-w-xl w-full bg-gray-900 text-gray-200 p-5 rounded-t-2xl z-50 transition-all duration-500 ease-in-out pb-24 border-t border-gray-800 shadow-2xl ${
              animateModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            {/* Sheet header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <FaShare className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">
                  Invite Friends
                </h2>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
              >
                <RxCross2 size={20} />
              </button>
            </div>

            {/* Sheet body */}
            <div className="space-y-4">
              {/* Send message */}
              <div
                onClick={handleInvite}
                className="flex items-center justify-between p-4 bg-gray-800/70 rounded-xl cursor-pointer hover:bg-gray-700/70 transition-colors border border-gray-700/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <FaMessage className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Send message</span>
                </div>
                <FaChevronRight className="text-gray-500" />
              </div>

              {/* Copy link */}
              <div
                onClick={setupInvitationLinkCopy}
                className="flex items-center justify-between p-4 bg-gray-800/70 rounded-xl cursor-pointer hover:bg-gray-700/70 transition-colors border border-gray-700/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <FaCopy className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Copy Link</span>
                </div>
                <FaChevronRight className="text-gray-500" />
              </div>

              {/* Invitation link display */}
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                <p className="text-xs text-gray-400 mb-2">
                  Your invitation link:
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-900 rounded p-2 text-sm text-gray-400 flex-1 truncate">
                    {invitationLink}
                  </div>
                  <button
                    onClick={setupInvitationLinkCopy}
                    className="ml-2 p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <FaCopy className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FriendsPage;
