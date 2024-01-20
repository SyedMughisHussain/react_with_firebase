
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOP-HfIcNj0kLikC-Xw1BN81y14fHPlgo",
  authDomain: "react-todo-21bc2.firebaseapp.com",
  projectId: "react-todo-21bc2",
  storageBucket: "react-todo-21bc2.appspot.com",
  messagingSenderId: "715129723660",
  appId: "1:715129723660:web:72f71995399d1dbd878729",
  measurementId: "G-0BX5CKM45F"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
