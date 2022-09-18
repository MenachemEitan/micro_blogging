import { createContext, useState } from "react";
export const TweetContext = createContext();
const Provider = TweetContext.Provider;
export const TweetProvider = (props) =>{
    const [tweetText, setTweetText] = useState("")
    const userName = props.user.displayName
    const photoUrl = props.user.photoURL
    return(
        <Provider value={{tweetText, setTweetText, userName, photoUrl }}>
            {props.children}
        </Provider>
    )
}
