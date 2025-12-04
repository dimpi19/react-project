// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4mn_aoOTvGaDf-HPs2BiT8eA05WaqeXY",
  authDomain: "myproject-9e663.firebaseapp.com",
  databaseURL: "https://myproject-9e663-default-rtdb.firebaseio.com",
  projectId: "myproject-9e663",
  storageBucket: "myproject-9e663.firebasestorage.app",
  messagingSenderId: "968160604817",
  appId: "1:968160604817:web:bc90738b1b3ad094720530",
  measurementId: "G-86JDFFKZXQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);