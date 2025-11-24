import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIwcDDIiJIdoCmS_D6Ag5WgouSlAjG2Zs",
  authDomain: "ali-farooqi.firebaseapp.com",
  projectId: "ali-farooqi",
  storageBucket: "ali-farooqi.firebasestorage.app",
  messagingSenderId: "843706821980",
  appId: "1:843706821980:web:0d567e896f50aaa95de599",
  measurementId: "G-36N38K25GD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
