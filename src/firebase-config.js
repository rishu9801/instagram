import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3ILrQjPhge2hv2cVQYvjF9gi0kQpwX10",
  authDomain: "instagram-9801.firebaseapp.com",
  databaseURL: "https://instagram-9801-default-rtdb.firebaseio.com",
  projectId: "instagram-9801",
  storageBucket: "instagram-9801.appspot.com",
  messagingSenderId: "42079259607",
  appId: "1:42079259607:web:3bb9cbe0082b3741595992",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
