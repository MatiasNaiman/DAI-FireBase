// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHyjHdV1rSgXWI6v4tcqPmI-wizuAX7Xc",
  authDomain: "dai-test-firebase.firebaseapp.com",
  projectId: "dai-test-firebase",
  storageBucket: "dai-test-firebase.appspot.com",
  messagingSenderId: "92193422387",
  appId: "1:92193422387:web:20b35e8dab950022b43746",
  measurementId: "G-JDYHJW8MM6"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
