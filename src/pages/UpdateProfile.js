import React from "react";
import HeaderWithLogout from "../components/HeaderWithLogout";
import {AiOutlineDoubleRight} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {

    const navigate = useNavigate();

    function goToPicAndNameUpdate(){
        setTimeout(() => {
            navigate("/update-profile-pic-name");
        }, 1000)
    }

    function gotEmailUpdate(){
        setTimeout(() => {
            navigate("/update-email")
        }, 1000)
    }

    function goToPasswordUpdate(){
        setTimeout(() => {
            navigate("/update-password")
        }, 1000)
    }


    return (
        <div>
            <HeaderWithLogout/>

            <div className="update-whole-cont"> 
                <h1 className="update-prof">What do you want to Update?</h1>
                <div className="update-opt-cont">
                    <button className="update-opt" onClick={goToPicAndNameUpdate}>
                        <p>Update Profile Pic and Name</p>
                        <AiOutlineDoubleRight/>
                    </button>

                    <button className="update-opt" onClick={gotEmailUpdate}>
                        <p>Update Email</p>
                        <AiOutlineDoubleRight/>
                    </button>

                    <button className="update-opt" onClick={goToPasswordUpdate}>
                        <p>Update Password</p>
                        <AiOutlineDoubleRight/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile;