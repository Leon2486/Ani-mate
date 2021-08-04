import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
//"AIzaSyBwcbr8TBk6ybqPahdvNaId1moFONet2q8"

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "ani-mate-319705.firebaseapp.com",
  projectId: "ani-mate-319705",
  storageBucket: "ani-mate-319705.appspot.com",
  messagingSenderId: "1063135883952",
  appId: "1:1063135883952:web:ce1964a10b401b130b8175",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
