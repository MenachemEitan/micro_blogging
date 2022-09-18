export const Button = ({func, Text, disabled}) =>{
    return(
        <button
        className="btn"
        onClick={func}
        disabled={disabled}>{Text}</button>
    )
}