import React, { useEffect } from "react";

interface ModalProps {
  message: string;
  onClose: () => void;
  children?: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ message, onClose, children }) => {
  useEffect(() => {
    // Automatically close the modal after 2000 milliseconds
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    // Clear the timer if the component unmounts before timeout
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg p-4 font-poppins">
      <div className="relative">
        {/* Candy gradient glow */}
        <div 
          className="absolute -inset-0.5 rounded-2xl blur opacity-40"
          style={{ background: 'linear-gradient(135deg, #00F5FF, #FF10F0, #B026FF)' }}
        />
        {/* Modal content */}
        <div 
          className="relative px-6 py-4 rounded-2xl shadow-xl flex items-center space-x-3 max-w-md"
          style={{
            background: 'rgba(45, 27, 78, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 245, 255, 0.2)'
          }}
        >
          <p className="text-white">{message}</p>
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
