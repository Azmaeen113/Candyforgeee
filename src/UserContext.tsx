import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { getOrCreateUser, updateUserCoins, updateUserEnergy, FirebaseUser } from './firebase/services';

// Declare the global Telegram object to avoid TypeScript errors
declare global {
  interface Window {
    Telegram: any;
  }
}

// Define the shape of the context's value
interface UserContextType {
  userID: string;
  setUserID: (newID: string) => void;
  points: number;
  setPoints: (newPoints: number | ((prevPoints: number) => number)) => void;
  trd: number;
  setTrd: (newTrd: number | ((prevTrd: number) => number)) => void;
  isStar: boolean;
  setIsStar: (value: boolean) => void;
  invitedby: string;
  setInvitedby: (value: string) => void;
  walletid: string;
  setWalletAddress: (value: string) => void;
  isDataLoaded: boolean;
  // Firebase user data
  firebaseUser: FirebaseUser | null;
  refreshUserData: () => Promise<void>;
  addPoints: (amount: number) => Promise<void>;
  energy: number;
  setEnergy: (energy: number) => void;
  maxEnergy: number;
  level: number;
  referralCode: string;
  tasksCompleted: string[];
}

// Creating the context with default placeholder values
const UserContext = createContext<UserContextType>({
  userID: '',
  setUserID: () => {},
  points: 0,
  setPoints: () => {},
  trd: 0,
  setTrd: () => {},
  isStar: false,
  setIsStar: () => {},
  invitedby: '',
  setInvitedby: () => {},
  walletid: '',
  setWalletAddress: () => {},
  isDataLoaded: false,
  // Firebase defaults
  firebaseUser: null,
  refreshUserData: async () => {},
  addPoints: async () => {},
  energy: 500,
  setEnergy: () => {},
  maxEnergy: 500,
  level: 1,
  referralCode: '',
  tasksCompleted: [],
});

// Provider component to wrap around the application
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userID, setUserID] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [trd, setTrd] = useState<number>(0);
  const [isStar, setIsStar] = useState<boolean>(false);
  const [invitedby, setInvitedby] = useState<string>('');
  const [walletid, setWalletAddress] = useState<string>('');
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  
  // Firebase state
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [energy, setEnergy] = useState<number>(500);
  const [maxEnergy, setMaxEnergy] = useState<number>(500);
  const [level, setLevel] = useState<number>(1);
  const [referralCode, setReferralCode] = useState<string>('');
  const [tasksCompleted, setTasksCompleted] = useState<string[]>([]);

  // Refresh user data from Firebase
  const refreshUserData = useCallback(async () => {
    if (!userID) return;
    try {
      const user = await getOrCreateUser({
        id: userID,
        first_name: window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name,
        last_name: window.Telegram?.WebApp?.initDataUnsafe?.user?.last_name,
        username: window.Telegram?.WebApp?.initDataUnsafe?.user?.username,
        photo_url: window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url,
      });
      setFirebaseUser(user);
      setPoints(user.coins);
      setEnergy(user.energy);
      setMaxEnergy(user.maxEnergy);
      setLevel(user.level);
      setReferralCode(user.referralCode);
      setTasksCompleted(user.tasksCompleted || []);
      setTrd(user.stars);
    } catch (error) {
      console.error('Error fetching user data from Firebase:', error);
    }
  }, [userID]);

  // Add points and sync to Firebase
  const addPoints = useCallback(async (amount: number) => {
    if (!userID) return;
    try {
      await updateUserCoins(userID, amount);
      setPoints(prev => prev + amount);
    } catch (error) {
      console.error('Error updating points:', error);
    }
  }, [userID]);

  // Sync energy to Firebase
  const handleSetEnergy = useCallback(async (newEnergy: number) => {
    setEnergy(newEnergy);
    if (userID) {
      try {
        await updateUserEnergy(userID, newEnergy);
      } catch (error) {
        console.error('Error updating energy:', error);
      }
    }
  }, [userID]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const extractTelegramData = () => {
      if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.setHeaderColor("#000000");

        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        const extractedUserID = initDataUnsafe.user?.id;
        const extractedIsStar = initDataUnsafe.user?.is_premium;
        const startParam = initDataUnsafe.start_param;

        // Only set data if Telegram has provided it
        if (extractedUserID !== undefined) {
          setUserID(String(extractedUserID));
        }
        if (extractedIsStar !== undefined) {
          setIsStar(extractedIsStar);
        }
        if (startParam && startParam.startsWith("invitedby_")) {
          setInvitedby(startParam.replace("invitedby_", ""));
        }

        setIsDataLoaded(true);
        clearInterval(intervalId); // Stop polling once data is loaded
      }
    };

    // Initial attempt to extract data
    extractTelegramData();

    // Set up polling to check for Telegram data every 500ms
    intervalId = setInterval(extractTelegramData, 500);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Load user data from Firebase when userID is available
  useEffect(() => {
    if (userID && isDataLoaded) {
      refreshUserData();
    }
  }, [userID, isDataLoaded, refreshUserData]);

  return (
    <UserContext.Provider
      value={{
        userID,
        setUserID,
        points,
        setPoints,
        trd,
        setTrd,
        isStar,
        setIsStar,
        invitedby,
        setInvitedby,
        walletid,
        setWalletAddress,
        isDataLoaded,
        // Firebase data
        firebaseUser,
        refreshUserData,
        addPoints,
        energy,
        setEnergy: handleSetEnergy,
        maxEnergy,
        level,
        referralCode,
        tasksCompleted,
      }}
    >
      {isDataLoaded ? children : null} {/* Only render children when data is loaded */}
    </UserContext.Provider>
  );
};

// Custom hook to make using the context easier in other components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
