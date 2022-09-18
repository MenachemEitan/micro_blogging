import { createContext, useState } from "react";
export const TweetListContext = createContext();
const Provider = TweetListContext.Provider;

export const TweetListProvider = (props) =>{

    const [tweets, addTweets] = useState(props.tweetList)
    console.log(props.userPhotoUrl);
    console.log(tweets);
    if (props.tweetList !== tweets){
        addTweets(props.tweetList)
    }
    return(
        <Provider value={{tweets, addTweets}}>
            {props.children}
        </Provider>
    )
}

