// DailyLoginModal.tsx
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { mainLogo } from "../images";
import { useUser } from "../UserContext";

interface DailyRewardModalProps {
  onClose: () => void;
}

/* static reward table */
const days = [
  { day: 1, reward: 100 },
  { day: 2, reward: 200 },
  { day: 3, reward: 300 },
  { day: 4, reward: 400 },
  { day: 5, reward: 500 },
  { day: 6, reward: 600 },
  { day: 7, reward: 10_000 },
];

export default function DailyRewardModal({ onClose }: DailyRewardModalProps) {
  const { userID, setPoints } = useUser();

  /* local state */
  const [activeDay, setActiveDay] = useState(1); // which box is highlighted
  const [canClaim, setCanClaim] = useState(false); // claim-button enabled?
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalGot, setTotalGot] = useState<number>(0); // current balance from DB

  /* ------------------------------------------------------------------ */
  /* 1)  INITIAL FETCH – pull user info and decide UI state              */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!userID) return;

    const fetchUserData = async () => {
      try {
        const initData = window.Telegram.WebApp.initData || "";
        const res = await fetch(
          `https://frontend.goldenfrog.live/get_user?UserId=${userID}`,
          { headers: { "X-Telegram-Init-Data": initData } }
        );

        if (!res.ok) throw new Error("Failed to fetch user data");

        const { data } = await res.json();
        const lastTimeRaw = data?.dailyclaimedtime ?? null; // Unix s or null/0
        const streakRaw = data?.alreadydailyclaimed ?? "0"; // string | number
        const pointsRaw = data?.totalgot ?? 0;

        const lastTime = parseInt(lastTimeRaw ?? "0", 10) || 0;
        const streak = parseInt(streakRaw ?? "0", 10) || 0;
        const points = parseInt(pointsRaw ?? "0", 10) || 0;

        setTotalGot(points);

        /* ---------- first-time user ---------- */
        if (lastTime === 0) {
          setActiveDay(1);
          setCanClaim(true);
          setIsLoading(false);
          return;
        }

        /* ---------- compare calendar days (UTC) ---------- */
        const now = new Date(); // js Date (ms)
        const last = new Date(lastTime * 1000); // convert to ms

        // midnight UTC for both dates
        const utcMidnight = (d: Date) =>
          Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

        const diffDays =
          (utcMidnight(now) - utcMidnight(last)) / (24 * 60 * 60 * 1000);

        if (diffDays === 0) {
          // same calendar day → already claimed
          setActiveDay(streak === 0 ? 1 : streak);
          setCanClaim(false);
          setErrorMessage("Already claimed today's reward!");
        } else if (diffDays === 1) {
          // exactly next calendar day → continue streak
          let next = streak + 1;
          if (next > 7) next = 1; // loop after day 7
          setActiveDay(next);
          setCanClaim(true);
        } else {
          // gap >1 day → streak broken
          setActiveDay(1);
          setCanClaim(true);
          setErrorMessage("Daily streak broken – starting over from Day 1");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to load daily rewards");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userID]);

  /* ------------------------------------------------------------------ */
  /* 2)  CLAIM HANDLER                                                  */
  /* ------------------------------------------------------------------ */
  const handleClaim = async () => {
    if (!canClaim || isLoading) return;

    try {
      const reward = days[activeDay - 1].reward;
      const newTotal = totalGot + reward;
      const nowUnix = Math.floor(Date.now() / 1000);
      const newStreakStored = activeDay === 7 ? 0 : activeDay; // reset after day 7

      const initData = window.Telegram.WebApp.initData || "";
      const res = await fetch("https://frontend.goldenfrog.live/update_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Telegram-Init-Data": initData,
        },
        body: JSON.stringify({
          UserId: userID,
          totalgot: newTotal.toString(),
          dailyclaimedtime: nowUnix.toString(),
          alreadydailyclaimed: newStreakStored.toString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to update user data");

      /* success – update UI & global points */
      setTotalGot(newTotal);
      setPoints(newTotal);
      setCanClaim(false);
      setErrorMessage("Reward claimed successfully!");

      // close modal after brief success message
      setTimeout(onClose, 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to claim reward – please try again");
    }
  };

  /* ------------------------------------------------------------------ */
  /* 3)  RENDER                                                         */
  /* ------------------------------------------------------------------ */
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center font-poppins"
      style={{
        background: 'rgba(10, 5, 20, 0.95)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div className="px-4 w-full max-w-md">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <h2 
            className="text-3xl font-bold font-fredoka"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Daily Rewards
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(255, 16, 240, 0.2)',
              border: '1px solid rgba(255, 16, 240, 0.3)'
            }}
          >
            <HiMiniXMark size={24} className="text-candy-pink" />
          </button>
        </div>

        {/* messages */}
        {errorMessage && (
          <div
            className={`text-center mb-4 p-3 rounded-xl ${
              errorMessage.includes("success")
                ? "bg-candy-green/20 text-candy-green border border-candy-green/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {errorMessage}
          </div>
        )}

        {/* Day 1-6 grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {days.slice(0, 6).map(({ day, reward }) => (
            <div
              key={day}
              className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300"
              style={{
                background: day === activeDay 
                  ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 16, 240, 0.2))'
                  : 'rgba(45, 27, 78, 0.6)',
                backdropFilter: 'blur(10px)',
                border: day === activeDay 
                  ? '2px solid rgba(0, 245, 255, 0.5)'
                  : day < activeDay
                  ? '2px solid rgba(0, 255, 179, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: day === activeDay 
                  ? '0 0 20px rgba(0, 245, 255, 0.3)'
                  : 'none'
              }}
            >
              <div className="mb-1 text-[14px] font-medium flex gap-1 text-gray-300">
                <p>Day&nbsp;{day}</p>
                {day < activeDay && (
                  <FaCheck className="mt-[3px] text-[13px] text-candy-green" />
                )}
              </div>
              <div className="flex items-center text-[18px] font-bold text-white">
                +{reward}
                <img
                  src={mainLogo}
                  alt="Daily Reward"
                  className="ml-1 h-[22px] w-[22px] rounded-full -mt-1"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Day 7 row - Special candy styling */}
        <div
          className="flex flex-col items-center justify-center p-5 mb-6 rounded-2xl transition-all duration-300"
          style={{
            background: 7 === activeDay 
              ? 'linear-gradient(135deg, rgba(255, 229, 0, 0.2), rgba(255, 16, 240, 0.2))'
              : 'rgba(45, 27, 78, 0.6)',
            backdropFilter: 'blur(10px)',
            border: 7 === activeDay 
              ? '2px solid rgba(255, 229, 0, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 7 === activeDay 
              ? '0 0 30px rgba(255, 229, 0, 0.3)'
              : 'none'
          }}
        >
          <div className="mb-1 text-gray-300 font-medium">Day&nbsp;7</div>
          <div className="flex items-center text-xl font-bold text-candy-yellow">
            +{days[6].reward}
            <img
              src={mainLogo}
              alt="Daily Reward"
              className="ml-2 h-[26px] w-[26px] rounded-full -mt-1"
            />
          </div>
        </div>

        {/* claim button - Candy styled */}
        <button
          onClick={handleClaim}
          disabled={!canClaim || isLoading}
          className="w-full h-14 text-lg font-bold rounded-2xl transition-all duration-300 text-white"
          style={{
            background: canClaim
              ? 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)'
              : 'rgba(100, 100, 100, 0.5)',
            boxShadow: canClaim
              ? '0 8px 30px rgba(255, 16, 240, 0.4)'
              : 'none',
            cursor: canClaim ? 'pointer' : 'not-allowed'
          }}
        >
          {isLoading
            ? "Loading…"
            : canClaim
            ? "Claim Reward"
            : "Already Claimed"}
        </button>
      </div>
    </div>
  );
}
