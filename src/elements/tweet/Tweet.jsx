import './Tweet.css'
export const Tweet = ({ content, userName, date, photoUrl }) => {
    return (
        <div className="Tweet">
            <header>
                <div className="imgAndName">
                    <img src={photoUrl}></img>
                    <div>{userName}</div>
                </div>
                <div>{date}</div>


            </header>
            <div className='divtext'>
                {content}
            </div>

        </div>
    )
}