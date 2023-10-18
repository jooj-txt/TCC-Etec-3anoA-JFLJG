import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0O__HMlIABOS8DenBCvgo5GRuKRlRmfI",
  authDomain: "tcc-3a-etec.firebaseapp.com",
  projectId: "tcc-3a-etec",
  storageBucket: "tcc-3a-etec.appspot.com",
  messagingSenderId: "651867069353",
  appId: "1:651867069353:web:1b8b1a52b436029ca782b8",
  measurementId: "G-T3J39N7B20"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
