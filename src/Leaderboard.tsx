/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { FaTrophy, FaCrown, FaUsers, FaChevronUp } from "react-icons/fa";


import medal1 from "./images/medal1.png";
import medal2 from "./images/medal2.png";
import medal3 from "./images/medal3.png";

// Define the fixed color sequence for the first 10 users
const fixedColors = [
  "#2ECC71", // Green
  "#9B59B6", // Purple
  "#8B4513", // Brown
  "#E74C3C", // Red
  "#000000", // Black
  "#2ECC71", // Green
  "#9B59B6", // Purple
  "#8B4513", // Brown
  "#E74C3C", // Red
  "#000000" // Black
];

// Define the color for all other users
const defaultColor = "#FDF1B6";

const LeaderboardPage: React.FC = () => {
  const { userID } = useUser();

  const [ownRanking, setOwnRanking] = useState({
    username: "",
    totalgot: 0,
    position: 0
  });

  const [leaderboardData, setLeaderboardData] = useState<
    Array<{ username: string; totalgot: number; position: number }>
  >([]);
  const [totalUsers, setTotalUsers] = useState("0");

  // Function to save data to localStorage
  const saveToLocalStorage = (key: string, value: any) => {
    const data = {
      value,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Function to retrieve data from localStorage
  const getFromLocalStorage = (key: string, expiry: number = 5 * 60 * 1000) => {
    const dataString = localStorage.getItem(key);
    if (!dataString) return null;

    const data = JSON.parse(dataString);
    const now = new Date().getTime();

    // Check if data is not expired
    if (now - data.timestamp > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return data.value;
  };

  // Function to get a color for each user based on their position
  const getColorForPosition = (index: number, username: string): string => {
    if (username === ownRanking.username) {
      return "#FFC300";
    }
    return index < 10 ? fixedColors[index] : defaultColor;
  };

  // Function to format numbers with K, M, B suffixes
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Load leaderboard data from localStorage if available
  useEffect(() => {
    const storedLeaderboardData = getFromLocalStorage("leaderboardData");
    const storedOwnRanking = getFromLocalStorage("ownRanking");
    const storedTotalUsers = getFromLocalStorage("totalUsers");

    if (storedLeaderboardData) {
      setLeaderboardData(storedLeaderboardData);
    }
    if (storedOwnRanking) {
      setOwnRanking(storedOwnRanking);
    }
    if (storedTotalUsers) {
      setTotalUsers(storedTotalUsers);
    }

    // Fetch latest leaderboard data from the server
    const fetchLeaderboardData = async () => {
      try {
        const initData = window.Telegram.WebApp.initData || ""; // Get initData from Telegram WebApp
        const response = await fetch(
          `https://frontend.goldenfrog.live/get_user_ranking?UserId=${userID}`,
          {
            headers: {
              "X-Telegram-Init-Data": initData // Add initData to headers
            }
          }
        );
        const data = await response.json();

        if (data.requested_user) {
          const userRanking = {
            username: data.requested_user.username,
            totalgot: data.requested_user.totalgot,
            position: data.requested_user.position
          };
          setOwnRanking(userRanking);
          saveToLocalStorage("ownRanking", userRanking);
        }

        if (data.top_users) {
          const formattedLeaderboardData = data.top_users.map((user: any) => ({
            username: user.username,
            totalgot: user.totalgot,
            position: user.rank
          }));
          setLeaderboardData(formattedLeaderboardData);
          saveToLocalStorage("leaderboardData", formattedLeaderboardData);
        }

        if (data.total_users) {
          setTotalUsers(data.total_users);
          saveToLocalStorage("totalUsers", data.total_users);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, [userID]);

  // const fakeLeaderboardData = [
  //   { username: "User1", totalgot: 100000, position: 1 },
  //   { username: "User2", totalgot: 90000, position: 2 },
  //   { username: "User3", totalgot: 80000, position: 3 },
  //   { username: "User4", totalgot: 70000, position: 4 },
  //   { username: "User5", totalgot: 60000, position: 5 },
  //   { username: "User6", totalgot: 50000, position: 6 },
  //   { username: "User7", totalgot: 40000, position: 7 },
  //   { username: "User8", totalgot: 30000, position: 8 },
  //   { username: "User9", totalgot: 20000, position: 9 },
  //   { username: "User10", totalgot: 10000, position: 10 }
  // ];

  return (
    <div 
      className="relative min-h-screen z-10 text-gray-200 font-poppins"
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

      <div className="relative z-10 flex flex-col items-center pt-6 h-[94vh] overflow-y-scroll overflow-x-hidden hide-scrollbar pb-16 px-4">
        {/* Candy styled header */}
        <div className="mb-10 mt-4">
          <div className="flex flex-col items-center">
            <div 
              className="relative rounded-3xl overflow-hidden w-full max-w-[328px]"
              style={{ boxShadow: '0 8px 40px rgba(0, 245, 255, 0.2)', margin: '20px 0' }}
            >
              <img 
                src="/banners/rank page banner.png" 
                alt="Leaderboard Header" 
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
            <div className="flex items-center justify-center mt-4 space-x-2">
              <FaTrophy className="w-5 h-5 text-candy-yellow" />
              <p className="text-sm text-gray-300">
                Top Candy Forgers in the Galaxy
              </p>
            </div>
          </div>
        </div>

        {/* Current User Card - Candy Glow Effect */}
        <div className="w-full mb-6 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="relative">
            {/* Candy glow effect */}
            <div 
              className="absolute -inset-[1px] rounded-2xl blur opacity-40"
              style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)' }}
            />

            <div 
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(45, 27, 78, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 245, 255, 0.2)'
              }}
            >
              {/* Animated candy gradient bar */}
              <div 
                className="h-1 w-full"
                style={{
                  background: 'linear-gradient(90deg, #00F5FF, #FF10F0, #B026FF, #FFE500)',
                  backgroundSize: '300% 100%',
                  animation: 'gradient-x 4s ease infinite'
                }}
              />

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)',
                          boxShadow: '0 4px 20px rgba(0, 245, 255, 0.4)'
                        }}
                      >
                        <span className="text-white font-bold text-xl font-fredoka">
                          {ownRanking.username
                            ? ownRanking.username.slice(0, 2).toUpperCase()
                            : "YO"}
                        </span>
                      </div>
                      <div 
                        className="absolute -inset-1 rounded-full animate-pulse"
                        style={{ border: '1px solid rgba(0, 245, 255, 0.3)' }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-semibold text-white">
                          {ownRanking.username || "Your Rank"}
                        </p>
                        {ownRanking.position <= 3 && (
                          <FaCrown className="w-4 h-4 text-candy-yellow" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div 
                          className="px-3 py-1 rounded-full"
                          style={{
                            background: 'rgba(0, 245, 255, 0.15)',
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
                            {formatNumber(ownRanking.totalgot)} CANDY
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-candy-green">
                          <FaChevronUp className="w-3 h-3" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative">
                      <div 
                        className="absolute -inset-1 rounded-full blur-sm"
                        style={{ background: 'rgba(0, 245, 255, 0.2)' }}
                      />
                      <div 
                        className="relative px-4 py-2 rounded-full"
                        style={{
                          background: 'rgba(45, 27, 78, 0.8)',
                          border: '1px solid rgba(0, 245, 255, 0.3)'
                        }}
                      >
                        <span 
                          className="font-bold text-xl font-fredoka"
                          style={{
                            background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}
                        >
                          #{ownRanking.position || "?"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">
                      Your Rank
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Members Card - Candy Glassmorphism */}
        <div className="w-full mb-6 relative">
          <div 
            className="absolute -inset-[0.5px] rounded-2xl blur-sm opacity-30"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)' }}
          />
          <div 
            className="relative rounded-2xl p-4"
            style={{
              background: 'rgba(45, 27, 78, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 245, 255, 0.15)'
            }}
          >
            <div className="flex items-center justify-between">
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
                  <h2 className="text-lg font-bold text-white">Community</h2>
                  <p className="text-xs text-gray-400">Total Candy Forgers</p>
                </div>
              </div>
              <div className="text-right">
                <span 
                  className="font-bold text-xl font-fredoka"
                  style={{
                    background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {totalUsers
                    ? formatNumber(Number.parseInt(totalUsers))
                    : "47.2M+"}
                </span>
                <p className="text-xs text-gray-400">Active Forgers</p>
              </div>
            </div>

            {/* Animated candy progress bar */}
            <div className="mt-3 h-2 w-full bg-forge-deep rounded-full overflow-hidden">
              <div
                className="h-full rounded-full animate-pulse"
                style={{ 
                  width: "85%",
                  background: 'linear-gradient(90deg, #00F5FF, #FF10F0, #B026FF)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Leaderboard List - Candy Cards with Hover Effects */}
        <div className="w-full space-y-3 pb-4">
          {leaderboardData.map((user, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-4 transition-all duration-300 hover:translate-x-1"
              style={{
                background: 'rgba(45, 27, 78, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 245, 255, 0.1)'
              }}
            >
              <div className="flex items-center justify-between">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: index < 3 
                          ? 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)'
                          : `linear-gradient(135deg, ${getColorForPosition(index, user.username)}, ${getColorForPosition(index, user.username)}88)`,
                        boxShadow: index < 3 
                          ? '0 4px 15px rgba(255, 16, 240, 0.4)'
                          : 'none'
                      }}
                    >
                      <span className="font-bold text-white text-sm font-fredoka">
                        {user.username.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    {index < 3 && (
                      <div
                        className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                          background: index === 0 
                            ? 'linear-gradient(135deg, #FFE500, #FFA500)'
                            : index === 1 
                            ? 'linear-gradient(135deg, #C0C0C0, #808080)'
                            : 'linear-gradient(135deg, #CD7F32, #8B4513)'
                        }}
                      >
                        <span className="text-white text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-white">
                        {user.username}
                      </p>
                      {index === 0 && (
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: 'rgba(255, 229, 0, 0.2)',
                            border: '1px solid rgba(255, 229, 0, 0.3)',
                            color: '#FFE500'
                          }}
                        >
                          Top Forger
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <p 
                        className="text-sm font-medium"
                        style={{
                          background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {formatNumber(user.totalgot)} CANDY
                      </p>
                      <div className="flex items-center space-x-1">
                        <div className="h-1.5 w-1.5 bg-candy-green rounded-full animate-pulse"></div>
                        <p className="text-xs text-gray-400">Active</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Position Indicator */}
                <div className="flex items-center">
                  {index < 3 ? (
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full blur-sm"
                        style={{
                          background: index === 0
                            ? 'rgba(255, 229, 0, 0.3)'
                            : index === 1
                            ? 'rgba(192, 192, 192, 0.3)'
                            : 'rgba(205, 127, 50, 0.3)'
                        }}
                      />
                      <img
                        src={index === 0 ? medal1 : index === 1 ? medal2 : medal3}
                        alt={`Rank ${index + 1}`}
                        className="w-8 h-8 object-contain animate-softbounce relative z-10"
                      />
                    </div>
                  ) : (
                    <div 
                      className="px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(45, 27, 78, 0.8)',
                        border: '1px solid rgba(0, 245, 255, 0.2)'
                      }}
                    >
                      <span 
                        className="font-bold text-sm"
                        style={{
                          background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        #{index + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Candy Progress Line */}
              <div
                className="absolute bottom-0 left-1 h-[2px] rounded-full"
                style={{
                  width: `${Math.min((user.totalgot / 100000) * 100, 97)}%`,
                  background: 'linear-gradient(90deg, #00F5FF, #FF10F0, #B026FF)'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
