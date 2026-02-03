import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCLkv5awDs553Qfn71szpxyyAX8bL_K2Lw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "candyforge.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "candyforge",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "candyforge.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "806367616272",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:806367616272:web:573e6f0afbfc6058fd9995",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0XJXBLZ55B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app;
