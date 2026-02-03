import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  serverTimestamp,
  increment,
  Timestamp
} from "firebase/firestore";
import { db } from "./config";

// ==================== USER SERVICES ====================

export interface FirebaseUser {
  odl_id: string;
  odl_first_name: string;
  odl_last_name: string;
  odl_username: string;
  odl_photo_url: string;
  coins: number;
  level: number;
  stars: number;
  energy: number;
  maxEnergy: number;
  lastEnergyUpdate: Timestamp;
  referralCode: string;
  referredBy: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  dailyRewardDay: number;
  lastDailyReward: Timestamp | null;
  tasksCompleted: string[];
}

// Get or create user by Telegram ID
export async function getOrCreateUser(telegramUser: {
  id: number | string;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}): Promise<FirebaseUser> {
  const odlId = String(telegramUser.id);
  const userRef = doc(db, "users", odlId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // Update last seen
    await updateDoc(userRef, {
      updatedAt: serverTimestamp()
    });
    return userSnap.data() as FirebaseUser;
  }

  // Create new user
  const newUser: Omit<FirebaseUser, 'createdAt' | 'updatedAt' | 'lastEnergyUpdate'> & {
    createdAt: ReturnType<typeof serverTimestamp>;
    updatedAt: ReturnType<typeof serverTimestamp>;
    lastEnergyUpdate: ReturnType<typeof serverTimestamp>;
  } = {
    odl_id: odlId,
    odl_first_name: telegramUser.first_name || "",
    odl_last_name: telegramUser.last_name || "",
    odl_username: telegramUser.username || "",
    odl_photo_url: telegramUser.photo_url || "",
    coins: 0,
    level: 1,
    stars: 0,
    energy: 500,
    maxEnergy: 500,
    lastEnergyUpdate: serverTimestamp(),
    referralCode: generateReferralCode(odlId),
    referredBy: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    dailyRewardDay: 0,
    lastDailyReward: null,
    tasksCompleted: []
  };

  await setDoc(userRef, newUser);
  
  // Fetch the created user
  const createdUserSnap = await getDoc(userRef);
  return createdUserSnap.data() as FirebaseUser;
}

// Update user coins
export async function updateUserCoins(odlId: string, amount: number): Promise<void> {
  const userRef = doc(db, "users", odlId);
  await updateDoc(userRef, {
    coins: increment(amount),
    updatedAt: serverTimestamp()
  });

  // Log transaction
  await addTransaction({
    odl_id: odlId,
    type: amount > 0 ? "earn" : "spend",
    amount: Math.abs(amount),
    description: amount > 0 ? "Points earned" : "Points spent",
    status: "completed"
  });
}

// Update user energy
export async function updateUserEnergy(odlId: string, energy: number): Promise<void> {
  const userRef = doc(db, "users", odlId);
  await updateDoc(userRef, {
    energy,
    lastEnergyUpdate: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

// Update user level
export async function updateUserLevel(odlId: string, level: number): Promise<void> {
  const userRef = doc(db, "users", odlId);
  await updateDoc(userRef, {
    level,
    updatedAt: serverTimestamp()
  });
}

// Get user by ID
export async function getUserById(odlId: string): Promise<FirebaseUser | null> {
  const userRef = doc(db, "users", odlId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? (userSnap.data() as FirebaseUser) : null;
}

// ==================== LEADERBOARD ====================

export interface LeaderboardEntry {
  odl_id: string;
  odl_username: string;
  odl_first_name: string;
  odl_photo_url: string;
  coins: number;
  level: number;
  rank?: number;
}

export async function getLeaderboard(limitCount: number = 100): Promise<LeaderboardEntry[]> {
  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("coins", "desc"), limit(limitCount));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc, index) => ({
    odl_id: doc.id,
    odl_username: doc.data().odl_username,
    odl_first_name: doc.data().odl_first_name,
    odl_photo_url: doc.data().odl_photo_url,
    coins: doc.data().coins,
    level: doc.data().level,
    rank: index + 1
  }));
}

export async function getUserRank(odlId: string): Promise<number> {
  const user = await getUserById(odlId);
  if (!user) return 0;

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("coins", ">", user.coins));
  const snapshot = await getDocs(q);
  
  return snapshot.size + 1;
}

// ==================== DAILY REWARDS ====================

export async function claimDailyReward(odlId: string): Promise<{ day: number; reward: number } | null> {
  const userRef = doc(db, "users", odlId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) return null;
  
  const userData = userSnap.data() as FirebaseUser;
  const now = new Date();
  const lastReward = userData.lastDailyReward?.toDate();
  
  // Check if already claimed today
  if (lastReward) {
    const lastRewardDate = new Date(lastReward);
    if (
      lastRewardDate.getDate() === now.getDate() &&
      lastRewardDate.getMonth() === now.getMonth() &&
      lastRewardDate.getFullYear() === now.getFullYear()
    ) {
      return null; // Already claimed today
    }
  }
  
  // Calculate new day (reset after day 7)
  let newDay = (userData.dailyRewardDay % 7) + 1;
  
  // Check if streak is broken (more than 24 hours since last claim)
  if (lastReward) {
    const hoursSinceLastReward = (now.getTime() - lastReward.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastReward > 48) {
      newDay = 1; // Reset streak
    }
  }
  
  // Daily rewards: Day 1 = 500, Day 2 = 1000, etc.
  const rewards = [500, 1000, 2500, 5000, 15000, 25000, 100000];
  const reward = rewards[newDay - 1];
  
  await updateDoc(userRef, {
    dailyRewardDay: newDay,
    lastDailyReward: serverTimestamp(),
    coins: increment(reward),
    updatedAt: serverTimestamp()
  });
  
  // Log transaction
  await addTransaction({
    odl_id: odlId,
    type: "reward",
    amount: reward,
    description: `Daily reward - Day ${newDay}`,
    status: "completed"
  });
  
  return { day: newDay, reward };
}

// ==================== TASKS ====================

export async function completeTask(odlId: string, taskId: string, reward: number): Promise<boolean> {
  const userRef = doc(db, "users", odlId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) return false;
  
  const userData = userSnap.data() as FirebaseUser;
  
  // Check if task already completed
  if (userData.tasksCompleted?.includes(taskId)) {
    return false;
  }
  
  await updateDoc(userRef, {
    tasksCompleted: [...(userData.tasksCompleted || []), taskId],
    coins: increment(reward),
    updatedAt: serverTimestamp()
  });
  
  // Log transaction
  await addTransaction({
    odl_id: odlId,
    type: "task",
    amount: reward,
    description: `Task completed: ${taskId}`,
    status: "completed"
  });
  
  return true;
}

// ==================== REFERRALS ====================

export async function applyReferralCode(odlId: string, referralCode: string): Promise<boolean> {
  // Find user with this referral code
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("referralCode", "==", referralCode));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return false;
  
  const referrerDoc = snapshot.docs[0];
  const referrerId = referrerDoc.id;
  
  // Don't allow self-referral
  if (referrerId === odlId) return false;
  
  const userRef = doc(db, "users", odlId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) return false;
  
  const userData = userSnap.data() as FirebaseUser;
  
  // Check if already referred
  if (userData.referredBy) return false;
  
  // Update user with referral
  await updateDoc(userRef, {
    referredBy: referrerId,
    coins: increment(5000), // Bonus for being referred
    updatedAt: serverTimestamp()
  });
  
  // Give bonus to referrer
  await updateDoc(doc(db, "users", referrerId), {
    coins: increment(5000), // Bonus for referring
    updatedAt: serverTimestamp()
  });
  
  return true;
}

export async function getReferrals(odlId: string): Promise<FirebaseUser[]> {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("referredBy", "==", odlId));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => doc.data() as FirebaseUser);
}

// ==================== TRANSACTIONS ====================

export interface Transaction {
  id?: string;
  odl_id: string;
  type: "earn" | "spend" | "reward" | "task" | "referral" | "game";
  amount: number;
  description: string;
  status: "pending" | "completed" | "failed";
  createdAt?: Timestamp;
}

export async function addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<string> {
  const transactionsRef = collection(db, "transactions");
  const docRef = await addDoc(transactionsRef, {
    ...transaction,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function getUserTransactions(odlId: string, limitCount: number = 50): Promise<Transaction[]> {
  const transactionsRef = collection(db, "transactions");
  const q = query(
    transactionsRef, 
    where("odl_id", "==", odlId), 
    orderBy("createdAt", "desc"), 
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Transaction));
}

// ==================== HELPERS ====================

function generateReferralCode(odlId: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CF${code}${odlId.slice(-3)}`;
}
