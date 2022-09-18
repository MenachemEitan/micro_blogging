import { NavLink } from "react-router-dom"
import "./navbar.css"

export const NavBar = ()=>{
    return(
        <div className="navbar">
            <NavLink className="navbtn" to="/">Home</NavLink>
            <NavLink className="navbtn" to="/users">Profile</NavLink>
        </div>
    )
}