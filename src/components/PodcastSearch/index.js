import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const PodcastSearch = ({type, placeholder, required, state, setState}) => {
    return(
        <div>
            <input type = {type} 
            placeholder={placeholder} 
            required = {required} 
            value = {state} 
            onChange={(e) => setState(e.target.value)} 
            className="podcast-search"/>
        </div>
    )
}

export default PodcastSearch;