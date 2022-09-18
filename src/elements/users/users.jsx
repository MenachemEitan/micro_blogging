import { useState } from "react"
import localForage from "localforage";
import "./users.css"
import { Button } from "elements/button/Button";
export const UsersPage = () => {
    const [userName, setUserName] = useState('')
    const SaveUserNameLocaly = () => {
        localForage.setItem('userName', userName)
        
        setUserName('')
        
    }
    const saveUserName = (e) => {
        setUserName(e.target.value)
    }
    return (
        <div className="usrespage">
            <h1>Profile</h1>
            <h3>User Name</h3>
            <input className="userInput" type={'text'} onChange={saveUserName} placeholder={'Choose a username for yourself'} value={userName}></input>
            <div className="btnLine">
                <Button func={SaveUserNameLocaly} Text="Save" disabled={false}></Button>
            </div>
        </div>
    )
}
