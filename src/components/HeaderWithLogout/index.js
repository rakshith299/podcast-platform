import React from "react";
import ReactDOM from "react-dom";
import {Link, useLocation} from "react-router-dom";
import "./styles.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";


const HeaderWithLogout = () => {
    const current = useLocation();
    const currentPathname = current.pathname;

    function handleLogOut(){

        let res = window.confirm("Are you sure, you want to log out?");

        if(res){

        
            signOut(auth)
            .then(() => {
                toast.success("Logged out successfully")
            })
            .catch((e) => {
                toast.error(e.message);
            })
        }
    }

    return(
        <div className="navbar">
            <div className="gradient"></div>
                <div className="links">
                    <Link to = "/" className={currentPathname === "/" ? "active" : ""}>Signup</Link>
                    <Link to = "/podcasts" className={currentPathname === "/podcasts" ? "active" : ""}>Podcasts</Link>
                    <Link to = "/start-a-podcast" className={currentPathname === "/start-a-podcast" ? "active" : ""}>Start A Podcast</Link>
                    <Link to = "/profile" className={currentPathname === "/profile" ? "active" : ""}>Profile</Link>
                    <Link onClick={handleLogOut}>Log Out</Link>
                </div>
            
        </div>
    )
}

export default HeaderWithLogout;