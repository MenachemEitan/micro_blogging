import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TweetListProvider } from 'TweetListContext';
import { TweetProvider } from 'TweetContext';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut} from "firebase/auth"
import { getFirestore, addDoc, query, orderBy, onSnapshot, collection, getDocs, where } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMuc5OzzpwQiNpWWZ_7fRpZfzCHvA7Xac",
  authDomain: "micro-blogging-219a0.firebaseapp.com",
  projectId: "micro-blogging-219a0",
  storageBucket: "micro-blogging-219a0.appspot.com",
  messagingSenderId: "739835564380",
  appId: "1:739835564380:web:b9707c325c8f275df27199",
  measurementId: "G-MFFLWEQ1DW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
let user;

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    console.log(user);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        photoUrl:user.photoURL
      });
      
    }
  } catch (err) {
    alert(err.message);
  }
};



const root = ReactDOM.createRoot(document.getElementById('root'));
// 


const streamTweets = (snapshot, error) => {
  const tweetsColRef = collection(db, 'tweets')
  const tweetsQuery = query(tweetsColRef, orderBy('date'))
  return onSnapshot(tweetsQuery, snapshot, error);
};


auth.onAuthStateChanged(user =>{
  if(user){
    streamTweets((querySnapshot) => {
  
      const updatedTweets =
      querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    root.render(
      <BrowserRouter>
        <TweetListProvider userPhotoUrl = {user.photoURL} tweetList = {updatedTweets.reverse()}>
          <TweetProvider user = {user}>
            <App firebaseApp={app} />
          </TweetProvider>
        </TweetListProvider>
      </BrowserRouter>
    );
    },
    (error) => console.error('tweets kaka', error))
  }else{
    signInWithGoogle().catch(
      e => console.error(e)
    )
  }
})


// 








