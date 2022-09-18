import { Tweet } from "../tweet/Tweet";
import './TweetList.css'
import { useContext } from "react";
import { TweetListContext } from "TweetListContext";

export const TweetList = ({ischeck}) => {
    const tweetList = useContext(TweetListContext)
    const tweets = tweetList["tweets"]
    if (!ischeck){
        return null
    }
    let i = 0;
    return (
        <div className="tweetList">
            <div></div>
            <div className="listofTweets">{tweets.map((tweet) => <Tweet
                key={i++}
                content={tweet.content}
                userName={tweet.userName}
                date={tweet.date}
                photoUrl = {tweet.photoUrl} >

            </Tweet>)}</div>
        </div>
    )
}