
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
// import { getFirestore, type Firestore } from "firebase/firestore";
// import { getFunctions, type Functions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDQhfG2IIIIUlzL-eqD22CG_nX_UVN5Grc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "smartpool-yqhk2.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://smartpool-yqhk2.firebaseio.com",
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "smartpool-yqhk2",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "smartpool-yqhk2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "smartpool-yqhk2.appspot.com",
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "751047097131",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:751047097131:web:9b2a264bf3eebb175da36e",
};

let app: FirebaseApp;
let auth: Auth;
// let firestore: Firestore;
// let functions: Functions;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

auth = getAuth(app);
// firestore = getFirestore(app);
// functions = getFunctions(app);


export { app, auth /*, firestore, functions */ };
