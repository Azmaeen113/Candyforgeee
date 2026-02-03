import { FaX } from "react-icons/fa6";

interface InsufficientFundsModalProps {
  onClose: () => void;
  onDailyTasks: () => void;
  onInviteFriends: () => void;
  onGoToShop: () => void;
  amountNeeded: number;
}

export default function InsufficientFundsModal({
  onClose,
  onDailyTasks,
  onInviteFriends,
  onGoToShop,
  amountNeeded
}: InsufficientFundsModalProps) {
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
              Insufficient CANDY
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

          <div className="px-5 pb-5 pt-4">
            <p className="mb-6 text-lg text-gray-300 font-normal">
              {amountNeeded.toLocaleString()} CANDY needed, invite friends or
              complete tasks to earn more CANDY.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={onDailyTasks}
                className="w-full flex items-center justify-center rounded-xl h-14 text-lg font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(45, 27, 78, 0.6)',
                  border: '1px solid rgba(0, 245, 255, 0.3)',
                  color: 'white'
                }}
              >
                Daily tasks
              </button>

              <button
                onClick={onInviteFriends}
                className="w-full h-14 flex items-center justify-center rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
                  boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
                }}
              >
                Invite friends
              </button>

              <button
                onClick={onGoToShop}
                className="w-full text-center py-2 transition-colors"
                style={{ color: '#00F5FF' }}
              >
                Go to the shop to purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
