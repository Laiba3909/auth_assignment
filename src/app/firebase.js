import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";  

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)  
  .catch((error) => {
    console.error("Persistence Error: ", error);
  });

const googleProvider = new GoogleAuthProvider();

let isGoogleSignInInProgress = false;

const signInWithGoogle = () => {
  if (isGoogleSignInInProgress) {
    console.log("Sign-in already in progress");
    return;
  }

  isGoogleSignInInProgress = true;

  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("User Info:", user);
    })
    .catch((error) => {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Google Sign-In was cancelled by the user.");
      } else if (error.code === "auth/popup-closed-by-user") {
        console.log("The popup was closed by the user before completing the sign-in.");
      } else {
        console.error("Google Sign-In Error:", error.message);
      }
    })
    .finally(() => {
      isGoogleSignInInProgress = false;
    });
};

const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { auth, signInWithGoogle, signInWithEmail };
export default app;

