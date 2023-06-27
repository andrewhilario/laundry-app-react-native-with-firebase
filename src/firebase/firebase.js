import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA_C8roN-AriAuDzvptuxjNgV-D2JlOmc",
  authDomain: "washwiselaundryapp.firebaseapp.com",
  projectId: "washwiselaundryapp",
  storageBucket: "washwiselaundryapp.appspot.com",
  messagingSenderId: "406233804023",
  appId: "1:406233804023:web:53321526b09f73bb5e77f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
