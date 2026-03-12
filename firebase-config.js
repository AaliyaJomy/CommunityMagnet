import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.x/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.x/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEJoEtoJdXqu_5b9qSF8sDMzn9fN3BaME",
  authDomain: "community-magnet-fbla.firebaseapp.com",
  projectId: "community-magnet-fbla",
  storageBucket: "community-magnet-fbla.firebasestorage.app",
  messagingSenderId: "462081379204",
  appId: "1:462081379204:web:aff392d3a7948d10a46bd1",
  measurementId: "G-T6L073FT5M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);