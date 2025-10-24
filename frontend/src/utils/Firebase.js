// frontend/src/utils/Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBTQ4Y-7B_LiwIVIOl7GzrBmVddO3jvHM",
  authDomain: "pixelegant-42c4f.firebaseapp.com",
  projectId: "pixelegant-42c4f",
  storageBucket: "pixelegant-42c4f.firebasestorage.app",
  messagingSenderId: "985077492292",
  appId: "1:985077492292:web:4dad6c5eb497816962aa11",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Configure Google provider
provider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, provider };
