// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBolr89mw2ZoPAjNgP8HwByN7qDCtpVho",
  authDomain: "core-field-355507.firebaseapp.com",
  projectId: "core-field-355507",
  storageBucket: "core-field-355507.appspot.com",
  messagingSenderId: "557414069408",
  appId: "1:557414069408:web:83c489661f43c07a97c5c5",
  measurementId: "G-6WGPXZL8VN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);