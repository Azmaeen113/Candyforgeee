type ReduceTimeOptionsProps = {
  isOpen: boolean;
  onClose: () => void;
  inviteModalRef: React.RefObject<HTMLDivElement>;
};

const InviteModal: React.FC<ReduceTimeOptionsProps> = ({
  isOpen,
  onClose,
  inviteModalRef,
}) => {
  
  return (
    <div
      ref={inviteModalRef}
      style={{
        backdropFilter: "blur(20px)",
        background: "linear-gradient(180deg, rgba(26, 11, 46, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)",
        border: "1px solid rgba(0, 245, 255, 0.3)",
      }}
      className={`fixed left-1/2 transform -translate-x-1/2 md:max-w-xl justify-around z-50 text-xs bottom-0 flex flex-col items-center animate-bounce-once w-full transition-transform duration-700 ease-in-out font-poppins ${
        isOpen
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-full opacity-0 scale-95"
      } text-white p-6 rounded-t-2xl shadow-lg`}
    >
      <div className="space-y-3 w-full flex flex-col items-center">
        <div
          className="flex items-center w-full justify-between p-4 rounded-xl"
          style={{
            background: "rgba(45, 27, 78, 0.6)",
            border: "1px solid rgba(0, 245, 255, 0.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center justify-center z-50 w-full">
            <div className="text-white rounded-lg w-full">
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 
                  className="text-lg font-bold font-fredoka text-end w-[60%]"
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  Invite friends
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(255, 16, 240, 0.2)',
                    border: '1px solid rgba(255, 16, 240, 0.3)'
                  }}
                >
                  <span className="text-[#FF10F0] text-xl">&times;</span>
                </button>
              </div>
              <button 
                className="w-full py-3 rounded-xl mb-3 font-semibold transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(0, 245, 255, 0.1)',
                  border: '1px solid rgba(0, 245, 255, 0.3)',
                  color: '#00F5FF'
                }}
              >
                Copy invite link
              </button>
              <button 
                className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
                  boxShadow: '0 8px 30px rgba(255, 16, 240, 0.4)'
                }}
              >
                Share invite link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
