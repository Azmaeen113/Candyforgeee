import React, { useEffect, useRef, useState } from "react";
import { useUser } from "./UserContext";
import { mainLogo } from "./images";
import checkboxImage from "./images/check.png";

interface OverlayPageProps {
  closeOverlay: () => void;
  userAdded?: boolean; // Made optional
}

const OverlayPage: React.FC<OverlayPageProps> = ({
  closeOverlay,
  userAdded
}) => {
  const { userID, isStar, setPoints } = useUser();

  const [completed, setCompleted] = useState([false, false, false, false]);
  const [tickVisible, setTickVisible] = useState([false, false, false, false]);
  const [showFinalPage, setShowFinalPage] = useState(false);
  const [showFinalPage2, setShowFinalPage2] = useState(false);
  const [showFinalPage3, setShowFinalPage3] = useState(false);
  const [yearsAgo, setYearsAgo] = useState(1);
  const [totalReward, setTotalReward] = useState(0);

  const [isDataFetched, setIsDataFetched] = useState(false);
  const isFetching = useRef(false);

  const fetchYearsAgo = async () => {
    if (isFetching.current) {
      return;
    }
    isFetching.current = true;
    try {
      const initData = window.Telegram?.WebApp?.initData || "";
      if (!initData) {
        console.error("Telegram initData is missing");
        return;
      }

      const url = `https://frontend.goldenfrog.live/get_creation_month_count?userid=${userID}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Telegram-Init-Data": initData
        }
      });

      if (response.ok) {
        const data = await response.json();
        setYearsAgo(data.years);
        setIsDataFetched(true);

        const additionalReward = isStar ? 250 : 0;
        const totalCalculatedReward = data.reward + additionalReward;

        setTotalReward(totalCalculatedReward);
        setPoints(() => totalCalculatedReward);

        // Update user's totalgot
        await fetch("https://frontend.goldenfrog.live/update_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Telegram-Init-Data": initData
          },
          body: JSON.stringify({
            UserId: userID,
            totalgot: totalCalculatedReward
          })
        });
      }
    } catch (error) {
      const err = error as any;
      console.error("API call error:", err.message);
    }
  };

  useEffect(() => {
    if (userAdded && !isFetching.current) {
      fetchYearsAgo();
    }
  }, [userAdded]);

  useEffect(() => {
    if (isDataFetched) {
      completed.forEach((_, index) => {
        setTimeout(() => {
          setCompleted((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });

          setTimeout(() => {
            setTickVisible((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });

            if (index === completed.length - 1) {
              setTimeout(() => {
                setShowFinalPage(true);
              }, 1000);
            }
          }, 1000);
        }, index * 2000);
      });
    }
  }, [isDataFetched]);

  // finalPage3
  const FinalPage3 = () => {
    return (
      <div
        className="fixed inset-0 flex flex-col justify-between items-center font-poppins"
        style={{
          background: 'linear-gradient(180deg, #1A0B2E 0%, #0A0E27 50%, #1A0B2E 100%)',
          minHeight: "100vh",
          color: "white",
          textAlign: "center",
          padding: "0 ",
          zIndex: 99999999999
        }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-3 h-3 rounded-full animate-pulse" style={{ background: '#00F5FF', opacity: 0.5 }}></div>
          <div className="absolute top-40 right-16 w-2 h-2 rounded-full animate-pulse" style={{ background: '#FF10F0', opacity: 0.4 }}></div>
          <div className="absolute bottom-40 left-20 w-4 h-4 rounded-full animate-pulse" style={{ background: '#B026FF', opacity: 0.3 }}></div>
        </div>

        {/* Top Text */}
        <div className="flex items-center justify-center h-full flex-col gap-24 relative z-10">
          {/* Central Reward Display */}
          <div className="flex flex-col items-center">
            <div 
              className="text-[4.5rem] font-extrabold leading-none drop-shadow-lg font-fredoka"
              style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {totalReward}
            </div>
            <div className="flex gap-1 items-center justify-center mt-2">
              <div 
                className="w-[45px] h-[45px] rounded-full p-[2px]"
                style={{ background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)' }}
              >
                <img
                  src={mainLogo}
                  alt="logo"
                  className="w-full h-full rounded-full object-cover"
                  style={{ background: '#1A0B2E' }}
                />
              </div>
              <p className="text-2xl ml-2 text-white font-semibold">Earned</p>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mb-6 text-center text-[#FFFFFF]">
            <p className="mb-2 font-medium">
              Keep an eye on the{" "}
              <span style={{ color: '#00F5FF' }}>calendar</span>
            </p>
            <p className="mt-4">Act fast before this offer ends!</p>
            <p>
              Let's Forge together to the{" "}
              <span style={{ color: '#FF10F0' }}>Next Level</span>
            </p>
            <p className="mt-2 font-bold">
              "Don't waste the Opportunity Again!"
            </p>
          </div>
        </div>
        {/* Claim Button */}
        <button
          onClick={() => {
            console.log("Claim button clicked");
            closeOverlay();
          }}
          className="text-white mb-8 text-base py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
          style={{
            width: "80%",
            background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
            boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
          }}
        >
          Claim
        </button>
      </div>
    );
  };

  // finalPage2
  const FinalPage2 = () => {
    return (
      <div
        className="fixed inset-0 flex flex-col justify-between items-center font-poppins"
        style={{
          background: 'linear-gradient(180deg, #1A0B2E 0%, #0A0E27 50%, #1A0B2E 100%)',
          minHeight: "100vh",
          color: "white",
          textAlign: "center",
          padding: "0 ",
          zIndex: 99999999999
        }}
      >
        {/* Three Lines at the Top */}
        <div className="mt-20 flex justify-center items-center space-x-2">
          <div
            style={{
              height: "4px",
              background: "rgba(100, 100, 100, 0.5)",
              width: "50px",
              borderRadius: "2px"
            }}
          ></div>
          <div
            style={{
              height: "4px",
              background: "linear-gradient(135deg, #00F5FF, #FF10F0)",
              width: "80px",
              borderRadius: "2px"
            }}
          ></div>
          <div
            style={{
              height: "4px",
              background: "rgba(100, 100, 100, 0.5)",
              width: "50px",
              borderRadius: "2px"
            }}
          ></div>
        </div>

        {/* Top Text */}
        <div className="-mt-10">
          <h1 
            className="text-2xl font-bold font-fredoka"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            You are a legend!
          </h1>
          {/* Conditionally render based on the value of 'isStar' */}
          {isStar ? (
            <p className="text-base mt-1" style={{ color: '#FFE500' }}>Telegram star!!</p>
          ) : (
            <p className="text-base mt-1"></p>
          )}
        </div>

        {/* Central Image */}
        <div className="flex flex-col items-center -mt-28 ">
          <div 
            className="w-[200px] h-[200px] rounded-full p-[3px]"
            style={{ background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)' }}
          >
            <img
              src={mainLogo}
              alt="Candy Forge"
              className="w-full h-full rounded-full object-cover"
              style={{ background: '#1A0B2E' }}
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => setShowFinalPage3(true)}
          className="text-white mb-8 text-base py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
          style={{
            width: "80%",
            background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
            boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
          }}
        >
          Continue
        </button>
      </div>
    );
  };

  // finalPage
  const FinalPage = () => {
    return (
      <div
        className="fixed inset-0 flex flex-col justify-between items-center font-poppins"
        style={{
          background: 'linear-gradient(180deg, #1A0B2E 0%, #0A0E27 50%, #1A0B2E 100%)',
          minHeight: "100vh",
          color: "white",
          textAlign: "center",
          padding: "0",
          zIndex: 99999999999
        }}
      >
        {/* Three Lines at the Top */}
        <div className="mt-20 flex justify-center items-center space-x-2">
          <div
            style={{
              height: "4px",
              background: "linear-gradient(135deg, #00F5FF, #FF10F0)",
              width: "50px",
              borderRadius: "2px"
            }}
          ></div>
          <div
            style={{
              height: "4px",
              background: "rgba(100, 100, 100, 0.5)",
              width: "80px",
              borderRadius: "2px"
            }}
          ></div>
          <div
            style={{
              height: "4px",
              background: "rgba(100, 100, 100, 0.5)",
              width: "50px",
              borderRadius: "2px"
            }}
          ></div>
        </div>

        {/* Top Text */}
        <div className="mt-4">
          <h1 
            className="text-2xl font-bold font-fredoka"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Legendary status!
          </h1>
          <p className="text-base mt-1 text-gray-300">You've joined Telegram</p>
        </div>

        {/* Central Large Text */}
        <div className="flex flex-col items-center">
          <div 
            className="text-[4.5rem] font-extrabold leading-none drop-shadow-lg font-fredoka"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {yearsAgo}
          </div>
          <p className="text-2xl mt-1 text-white ">years ago</p>
        </div>

        {/* Bottom Text */}
        <div className="mb-6">
          <p className="text-xs text-gray-400">Your account number is #{userID}.</p>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => setShowFinalPage2(true)}
          className="text-white mb-8 text-base py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
          style={{
            width: "80%",
            background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
            boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
          }}
        >
          Continue
        </button>
      </div>
    );
  };

  if (showFinalPage3) {
    return <FinalPage3 />;
  }

  if (showFinalPage2) {
    return <FinalPage2 />;
  }

  if (!showFinalPage) {
    return <FinalPage />;
  }

  // Main page content (original content)
  return (
    <div 
      className="z-50 fixed inset-0 flex flex-col justify-start items-center font-poppins"
      style={{ background: 'linear-gradient(180deg, #1A0B2E 0%, #0A0E27 50%, #1A0B2E 100%)' }}
    >
      {/* Animation and checklist page */}
      <div className="relative text-center text-white w-80">
        <h1 
          className="text-4xl font-extrabold mt-[10vh] mb-32 font-fredoka"
          style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Checking your account
        </h1>

        {/* List of checks */}
        <div className="space-y-4 mt-2">
          {[
            "Account Age Verified",
            "Activity Level Analyzed",
            "Telegram Premium Checked",
            "OG Status Confirmed"
          ].map((text, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-between bg-transparent py-1"
            >
              <div className="flex justify-between w-full">
                <span className="text-lg font-semibold text-white">{text}</span>
                {tickVisible[index] && (
                  <img src={checkboxImage} alt="Checked" className="w-6 h-6" />
                )}
              </div>
              <div 
                className="w-full h-[4px] mt-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(45, 27, 78, 0.6)' }}
              >
                <div
                  className={`h-full transition-all duration-1000 ease-linear ${
                    completed[index] ? "w-full" : "w-0"
                  }`}
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverlayPage;
