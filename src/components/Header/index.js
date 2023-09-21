import React from "react";
import ReactDOM from "react-dom";
import {Link, useLocation} from "react-router-dom";
import "./styles.css";


const Header = () => {
    const current = useLocation();
    const currentPathname = current.pathname;

    return(
        <div className="navbar">
            <div className="gradient"></div>
                <div className="links">
                    <Link to = "/" className={currentPathname === "/" ? "active" : ""}>Signup</Link>
                    <Link to = "/podcasts" className={currentPathname === "/podcasts" ? "active" : ""}>Podcasts</Link>
                    <Link to = "/start-a-podcast" className={currentPathname === "/start-a-podcast" ? "active" : ""}>Start A Podcast</Link>
                    <Link to = "/profile" className={currentPathname === "/profile" ? "active" : ""}>Profile</Link>
                </div>
            
        </div>
    )
}

export default Header;