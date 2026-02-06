import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../UserContext";
import { dailyReward, mainLogo } from "../images";
import { FaGamepad } from "react-icons/fa";
import GameModal from "./GameModal";
import { updateDailyTapLimit } from "../firebase/services";

interface TapEffect {
  id: number;
  x: number;
  y: number;
}

interface TapSectionProps {
  toggleDailyLogin: () => void;
}

export default function TapSection({ toggleDailyLogin }: TapSectionProps) {
  const { points, setPoints, trd, setTrd, userID } = useUser();
  const [tapEffects, setTapEffects] = useState<TapEffect[]>([]);
  const [nextId, setNextId] = useState(0);
  const [tapStyle, setTapStyle] = useState({});
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  /* ────────────────────────── helpers ────────────────────────── */

  // fire‑and‑forget write‑through so UI stays instant
  const sendTapToBackend = async (
    _newPoints: number,
    newClaimedTotal: number
  ) => {
    if (!userID) return;
    try {
      await updateDailyTapLimit(userID, newClaimedTotal);
      // Points are already being saved via UserContext addPoints
    } catch (err) {
      console.error("Tap sync failed:", err);
    }
  };

  /* ────────────────────────── tap handler ────────────────────────── */

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (trd >= 1000) {
      toast.error("Daily tap limit reached!");
      return;
    }

    /* tilt effect -------------------------------------------------- */
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - centerX) / centerX) * 20;
    const rotateX = ((centerY - y) / centerY) * 20;

    setTapStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`,
      boxShadow: "0 0 40px 12px rgba(0, 245, 255, 0.5), 0 0 80px 24px rgba(255, 16, 240, 0.3)",
      transition: "transform 120ms cubic-bezier(.4,2,.6,1), box-shadow 200ms"
    });
    setTimeout(
      () =>
        setTapStyle({
          transform: "rotateX(0deg) rotateY(0deg) scale(1)",
          boxShadow: "0 0 20px 6px rgba(0, 245, 255, 0.4), 0 0 40px 12px rgba(255, 16, 240, 0.2)",
          transition: "transform 200ms cubic-bezier(.4,2,.6,1), box-shadow 300ms"
        }),
      120
    );

    /* local state -------------------------------------------------- */
    const newPoints = points + 1;
    const newClaimedTotal = trd + 1;
    setPoints(newPoints);
    setTrd(newClaimedTotal);

    /* backend write‑through --------------------------------------- */
    sendTapToBackend(newPoints, newClaimedTotal);

    /* floating "+1" ----------------------------------------------- */
    const id = nextId;
    setNextId(id + 1);
    setTapEffects((prev) => [...prev, { id, x, y }]);
    setTimeout(
      () => setTapEffects((prev) => prev.filter((eff) => eff.id !== id)),
      900
    );
  };

  /* ────────────────────────── render ────────────────────────── */

  const tapsRemaining = 1000 - trd;
  const barPct = (tapsRemaining / 1000) * 100;

  return (
    <div className="flex flex-col justify-between items-center w-full h-full animate-fade-in-up font-poppins overflow-hidden py-2" style={{ minHeight: 'calc(100vh - 140px)', maxHeight: 'calc(100vh - 140px)' }}>
      {/* Candy Forge Balance Display */}
      <div className="flex items-center justify-center relative gap-2 shrink-0">
        <div 
          className="h-10 w-10 rounded-full flex items-center justify-center shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)',
            boxShadow: '0 4px 20px rgba(0, 245, 255, 0.4)'
          }}
        >
          <img
            src={mainLogo}
            alt="Candy Forge"
            className="h-9 w-9 object-contain rounded-full"
          />
        </div>
        <div className="flex items-center text-white text-2xl font-extrabold font-fredoka">
          {Math.floor(points).toLocaleString()}
          <span 
            className="text-lg ml-2 font-bold"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            CANDY
          </span>
        </div>
      </div>

      {/* Candy Tap Area - Glowing, Pulsing */}
      <div
        className="relative w-full max-w-[200px] rounded-full perspective-[800px] group cursor-pointer flex-shrink-0 my-2"
        onClick={handleTap}
      >
        {/* Outer glow effect */}
        <div 
          className="absolute inset-0 z-0 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(255, 16, 240, 0.2), rgba(176, 38, 255, 0.2))'
          }}
        />
        
        {/* Animated ring */}
        <div 
          className="absolute inset-[-3px] rounded-full animate-pulse"
          style={{
            background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF, #00F5FF)',
            backgroundSize: '300% 300%',
            animation: 'gradient-x 3s ease infinite'
          }}
        />
        
        {/* Main tap image */}
        <img
          src={mainLogo}
          alt="Tap to Forge"
          style={tapStyle}
          className="relative w-full h-auto rounded-full border-3 border-candy-cyan/50 shadow-xl select-none transition-all duration-200 bg-forge-deep"
        />
        
        {/* Tap effects */}
        {tapEffects.map((eff) => (
          <span
            key={eff.id}
            className="absolute font-extrabold text-[32px] animate-float pointer-events-none font-fredoka"
            style={{ 
              left: eff.x, 
              top: eff.y,
              background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.8))'
            }}
          >
            +1
          </span>
        ))}
      </div>

      {/* Play Game Button */}
      <div className="w-full max-w-[380px] px-3 shrink-0">
        <button
          onClick={() => setIsGameModalOpen(true)}
          className="w-full py-2 px-3 text-white flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'rgba(45, 27, 78, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 16, 240, 0.5)',
            boxShadow: '0 0 15px rgba(255, 16, 240, 0.3), inset 0 0 15px rgba(255, 16, 240, 0.1)'
          }}
        >
          <FaGamepad className="w-5 h-5" style={{ color: '#FF10F0' }} />
          <span 
            className="font-poppins"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Play Game
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#FFE500', color: '#1A0B2E' }}>
            +CANDY
          </span>
        </button>
      </div>

      {/* Candy Progress Bar */}
      <div className="flex flex-col gap-2 items-center w-full px-3 shrink-0">
        <div 
          className="flex items-center gap-2 w-full max-w-[380px] px-3 py-2 rounded-xl animate-fade-in"
          style={{
            background: 'rgba(45, 27, 78, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 245, 255, 0.2)'
          }}
        >
          <div className="flex-1 h-3 bg-forge-deep rounded-full overflow-hidden relative">
            <div
              className="h-full transition-all duration-500"
              style={{ 
                width: `${barPct}%`,
                background: 'linear-gradient(90deg, #00F5FF, #FF10F0, #B026FF)'
              }}
            >
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite'
                }}
              />
            </div>
          </div>
          <span 
            className="text-sm font-bold min-w-[60px] text-center"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #FF10F0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {tapsRemaining}/1000
          </span>
        </div>

        {/* Daily Reward Button - Candy Style */}
        <div className="w-full max-w-[380px] relative active:scale-95 transition-transform animate-fade-in-up">
          <button
            onClick={toggleDailyLogin}
            className="w-full py-3 px-3 text-white flex items-center justify-center rounded-xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
              boxShadow: '0 6px 25px rgba(255, 16, 240, 0.4)'
            }}
          >
            <div className="flex items-center gap-2">
              <img
                src={dailyReward}
                className="w-7 h-7"
                alt="Daily Reward"
              />
              <span className="font-bold text-base font-poppins">Daily Reward</span>
              <div className="flex items-center">
                <span className="relative flex h-5 w-5">
                  <span 
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: '#00F5FF' }}
                  />
                  <span 
                    className="relative inline-flex rounded-full h-5 w-5 text-xs items-center justify-center font-bold"
                    style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)' }}
                  />
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Game Modal */}
      <GameModal 
        isOpen={isGameModalOpen} 
        onClose={() => setIsGameModalOpen(false)} 
      />
    </div>
  );
}
