import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FidgetSpinner } from "react-loader-spinner";
import HeaderWithLogout from "../components/HeaderWithLogout";
import { useSelector } from "react-redux";
import "../index.css"
import Loader from "../components/Loader";
import FileInput from "../components/FileInput";
import anonymous from "../images/anonymous.jpg";
import Input from "../components/Input";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Profile = () => {

    let currentData = useSelector((state) => state.user.user);

    const [profilePic, setProfilePic] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [currentUserInfo, setCurrentUserInfo] = useState({});

    let navigate = useNavigate();

    


    function navigateToUpdateProfile(){
        setTimeout(() => {
            navigate("/update-profile")
        }, 1000)
    }

    function navigateToPodcasts(){
        setTimeout(() => {
            navigate("/podcasts")
        }, 1000)
    }

   useEffect(() => {
    async function getDataOfProfile(){
        const userData = await getDoc(doc(db, "users", auth.currentUser.uid))

        try{

            if(userData.exists()){
                setUserInfo(userData.data());
                setCurrentUserInfo(auth.currentUser);
            }

        }catch(e){
            toast.error(e.message);
        }
        
    }

    getDataOfProfile();


   }, [])

   console.log(currentUserInfo, "current user info");
    

    return(
        <div>

        
            {
                currentData && userInfo? 

                <div >
                    <HeaderWithLogout/>
                    <div className="profile-whole-cont">

                        <div className="profile-cont">
                            <h1 className="your-profile-h">Your Profile</h1>
                            <img src = {currentUserInfo.photoURL ? `${currentUserInfo.photoURL}` : `${anonymous}`}  className="profile-pic"/>

                            {
                                    currentUserInfo.displayName ? 
                                    
                                    <div>
                                        
                                        <p className="display-name">{currentUserInfo.displayName}</p>
                                        
                                    </div> :  ""
                                }



                            <div className="user-info-display-cont">                     
                                <div className="profile-each-div-cont">
                                    <p className="profile-type">Name : </p>
                                    <p className="profile-ans-1">{userInfo.name}</p>
                                </div>

                                <div  className="profile-each-div-cont">
                                    <p className="profile-type">Email : </p>
                                    <p className="profile-ans-2">{currentUserInfo.email}</p>
                                </div>

                                <div  className="profile-each-div-cont">
                                    <p className="profile-type">UID : </p>
                                    <p className="profile-ans-3">{userInfo.uid}</p>
                                </div>

                                
                            </div>                    
                        </div>


                        <div className="profile-btn-cont">
                            <Button text = "Update Profile" onClick = {navigateToUpdateProfile} disabled = {false}/>
                            <Button text = "Go To Podcasts" onClick = {navigateToPodcasts} disabled = {false}/>
                        </div>
                       
                    </div>
                    
                    
                </div> :

               <Loader/>

                
            }

        </div>
        
    )
}

export default Profile;



/*  /*<FileInput accept= {'image/*'} id = "profile-img" fileHandleFunc = {profileImageHandle}  text = "Set Profile Pic"/>*/