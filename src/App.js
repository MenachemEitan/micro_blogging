import './App.css';
import { Addtweet } from './elements/Addtweet/Addtweet';
import { TweetList } from './elements/TweetList/TweetList';
import React, { useState, useEffect, useContext } from 'react'
import { Loader } from 'elements/loader/loader';
import { NavBar } from 'elements/navbar/navbar';
import { Routes, Route } from 'react-router-dom';
import { UsersPage } from 'elements/users/users';
import { TweetListContext } from 'TweetListContext';
import { getFirestore, collection, addDoc, getDoc, query, orderBy, onSnapshot } from "firebase/firestore";


const App = ({ firebaseApp }) => {
  const url = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"
  const tweetsList = useContext(TweetListContext)
  const tweets = tweetsList['tweets']
  const addTweets = tweetsList['addTweets']
  // const db = getFirestore(firebaseApp);
  const [showLoadre, setLoader] = useState(false)
  const [ischeck, setIsCheck] = useState(false)


  const savenewTweet = async (tweet) => {
    console.log(tweet);

    const temp = JSON.stringify(tweet);
    const db = getFirestore(firebaseApp);
    const tweetsColRef = collection(db, 'tweets')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    setLoader(true)
    await addDoc(tweetsColRef, tweet).catch(e => {
      console.log(`While adding tweets`, e);
    });
    addTweets([tweet, ...tweets])
    setLoader(false)
  }





  return (
    <div className="App">
      <NavBar></NavBar>
      {ischeck && <TweetList ischeck = {ischeck} ></TweetList>
      }
      <input type={"checkbox"} onClick={()=>setIsCheck(!ischeck)}></input>

      <Routes>
        <Route path='/' element={<><Addtweet savenewTweet={savenewTweet} loading={showLoadre}></Addtweet>
  
          <Loader open={showLoadre}></Loader></>}></Route>
        <Route path='/users' element={<UsersPage></UsersPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
