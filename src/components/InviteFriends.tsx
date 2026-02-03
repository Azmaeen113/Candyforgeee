import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaFacebookMessenger, FaXTwitter } from "react-icons/fa6";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { LuLink } from "react-icons/lu";
import { trdLogo } from "../images";
import { useUser } from "../UserContext";

interface InviteFriendsProps {
  taskStatus: {
    [key: string]: "not_started" | "loading" | "claimable" | "completed";
  };
  refertotal: number;
  onInviteFriendsClick: (taskKey: string, column: string, reward: number, requiredFriends: number) => void;
}

export default function InviteFriends({ taskStatus, refertotal, onInviteFriendsClick }: InviteFriendsProps) {
  const { userID } = useUser();

  // Get invitation link
  const invitationLink = `https://t.me/tap2earnatmbot/ATM?startapp=${encodeURIComponent(userID)}`;

  const shareButtons = [
    { 
      icon: <FaTelegramPlane size={24} />, 
      color: "linear-gradient(135deg, #00F5FF, #0088cc)",
      onClick: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(invitationLink)}`, "_blank")
    },
    { 
      icon: <IoLogoWhatsapp size={24} />, 
      color: "linear-gradient(135deg, #00FFB3, #25D366)",
      onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(invitationLink)}`, "_blank")
    },
    { 
      icon: <FaFacebookMessenger size={24} />, 
      color: "linear-gradient(135deg, #00F5FF, #0084ff)",
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invitationLink)}`, "_blank")
    },
    { 
      icon: <HiOutlineChatBubbleBottomCenter size={24} />, 
      color: "linear-gradient(135deg, #00FFB3, #00B900)",
      onClick: () => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(invitationLink)}`, "_blank")
    },
    { 
      icon: <FaXTwitter size={24} />, 
      color: "linear-gradient(135deg, #2D1B4E, #1A0B2E)",
      onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(invitationLink)}`, "_blank")
    },
    { 
      icon: <LuLink size={24} />, 
      color: "linear-gradient(135deg, #B026FF, #FF10F0)",
      onClick: () => {
        navigator.clipboard.writeText(invitationLink);
        // You could add a toast notification here
      }
    }
  ];

  const inviteTasks = [
    { taskKey: "task10", goal: 1, reward: 1000 },
    { taskKey: "task11", goal: 5, reward: 5000 },
    { taskKey: "task12", goal: 10, reward: 10000 }
  ];

  return (
    <div 
      className="max-w-md mx-auto rounded-xl font-poppins"
      style={{
        background: 'rgba(45, 27, 78, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 245, 255, 0.2)'
      }}
    >
      {/* Header */}
      <div className="mb-4 px-4 pt-4">
        <h2 
          className="text-lg font-bold font-fredoka"
          style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Invite friends
        </h2>
        <p className="text-gray-400 text-xs font-normal">
          +1000 CANDY for each friend you invite
        </p>
      </div>

      {/* Share Buttons */}
      <div className="flex justify-center gap-2 items-center mb-6 px-4">
        {shareButtons.map((button, idx) => (
          <button
            key={idx}
            onClick={button.onClick}
            className="w-11 h-11 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
            style={{ background: button.color }}
          >
            <span className="text-white">{button.icon}</span>
          </button>
        ))}
      </div>

      {/* Invite Progress */}
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar px-4 pb-4 text-white">
        {inviteTasks.map((task) => {
          const status = taskStatus[task.taskKey] || "not_started";
          const isCompleted = status === "completed";
          const isClaimable = refertotal >= task.goal && !isCompleted;

          return (
            <div
              key={task.taskKey}
              className="flex items-center min-w-[75%] justify-between py-3 px-3 rounded-xl"
              style={{
                background: 'rgba(45, 27, 78, 0.8)',
                border: '1px solid rgba(0, 245, 255, 0.2)'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                {/* Progress Icon */}
                <div 
                  className="h-[40px] w-[40px] rounded-full p-[2px]"
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)' }}
                >
                  <img
                    src={trdLogo}
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>

                {/* Progress Info */}
                <div>
                  <p className="text-sm font-normal text-gray-300">
                    Invite {task.goal} friend{task.goal > 1 ? 's' : ''} ({Math.min(refertotal, task.goal)}/{task.goal})
                  </p>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: '#FFE500' }}
                  >
                    +{task.reward} CANDY
                  </p>
                </div>
              </div>
              {/* GO/Claim Button */}
              <button
                className="px-4 py-2 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={
                  isCompleted 
                    ? { background: 'rgba(100, 100, 100, 0.5)', cursor: 'not-allowed' }
                    : isClaimable
                    ? { background: 'linear-gradient(135deg, #00FFB3, #00F5FF)', boxShadow: '0 4px 15px rgba(0, 255, 179, 0.3)' }
                    : { background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)', boxShadow: '0 4px 15px rgba(255, 16, 240, 0.3)' }
                }
                onClick={() => {
                  if (!isCompleted && isClaimable) {
                    onInviteFriendsClick(task.taskKey, task.taskKey, task.reward, task.goal);
                  }
                }}
                disabled={isCompleted}
              >
                {isCompleted ? 'Done' : isClaimable ? 'Claim' : 'GO'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
