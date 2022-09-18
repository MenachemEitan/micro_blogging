import './loader.css'
export const Loader =({open}) =>{
    if(!open){
        return null
    }
    return(
        <div className="Loader" ></div>
    )
}