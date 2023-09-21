import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const Button = ({text, onClick, disabled}) => {
    return(
        <div className="btn-cont">
            <button className = "custom-btn" disabled = {disabled} onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button;