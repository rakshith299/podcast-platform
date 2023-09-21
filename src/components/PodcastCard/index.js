import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { Link } from "react-router-dom";
import {FiPlay} from "react-icons/fi";

const PodcastCard = ({id, title, displayImage}) => {
    return(
        <Link to = {`/podcast/${id}`}>      
            <div className="podcast-card" key = {id}>
                <img src = {displayImage} className="podcast-card-img"/>
                <div className="podcast-cont-title-play">
                    <p className="podcast-card-title">{title}</p>
                    <p className="podcast-play"><FiPlay/></p>
                </div>
                
            </div>
        </Link>
    )
}

export default PodcastCard;