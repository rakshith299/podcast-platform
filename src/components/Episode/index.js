import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button";
import "./styles.css";
import {FaPlay, FaPause} from "react-icons/fa"

const Episode = ({title, description, audioFile, index, key , onClick}) => {
    
    return(
        <div className="each-episode-cont" key = {key}>
            <h1 className="each-episode-title">{`Episode ${index} - ${title}`}</h1>
            <p className="each-episode-description">{description}</p>
            <button onClick={() => onClick(audioFile)} className="each-episode-btn"> <p><FaPlay/></p> <p className="play">Play</p></button>
        </div>
    )
}

export default Episode;