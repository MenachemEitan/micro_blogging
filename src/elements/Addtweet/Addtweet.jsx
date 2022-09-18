import { Button } from '../button/Button'
import './Addtweet.css'
import React, { useState, useContext} from 'react'
import localforage from 'localforage'
import { TweetContext } from 'TweetContext'
export const Addtweet = ({ savenewTweet, loading }) => {
    const charLimit = 140
    const tweetCon = useContext(TweetContext)
    const tweetText = tweetCon["tweetText"]
    const setTweetText = tweetCon["setTweetText"]
    const userName = tweetCon["userName" ]
    const userPhotoUrl = tweetCon["photoUrl"]

    const handleTweetTextChange = (e) => {
        setTweetText(e.target.value)
    }
    // let userName ;
    // const getUserName = async() =>{
    //      await localforage.getItem('userName').then((res)=>userName = res)
    // }
    // getUserName()
    const Tweet = () => {
        savenewTweet({
            date: new Date().toISOString(),
            userName: userName,
            content: tweetText,
            id :Date.now(),
            photoUrl: userPhotoUrl
        })
        setTweetText("")
    }

    return (<div className="Addtweet">
        <div></div>
        <div className='AddtweetBlock'>
            <textarea
                rows={8}
                cols={10}
                placeholder="What you have in mind..."
                className="AddTweetTextarea"
                onChange={handleTweetTextChange}
                value={tweetText}>

            </textarea>
            <footer className='footer'>
                {tweetText.length < charLimit || <div className='maxCharMass'> the tweet can't contain mor tha {charLimit} chars</div>}
                <Button func={Tweet} Text="Tweet" disabled={tweetText.length > charLimit ||tweetText.length === charLimit|| tweetText.length === 0|| loading}></Button>
            </footer>
        </div>
    </div>
    )
}