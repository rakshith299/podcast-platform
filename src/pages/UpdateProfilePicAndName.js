import React, { useRef, useState } from "react";
import HeaderWithLogout from "../components/HeaderWithLogout";
import Input from "../components/Input";
import FileInput from "../components/FileInput";
import Button from "../components/Button";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProfilePicAndName = () => {
    const [updateProfilePic, setUpdateProfilePic] = useState("");
    const [updateName, setUpdateName] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let updatePicRef  = useRef();

    function profileImageHandle(file){
        setUpdateProfilePic(file)
    }

    async function handlePicAndNameUpdate(){

        if(updateName !== "" && updateProfilePic){
            try{

                setLoading(true);

                const profilePicRef = ref(storage, `userProfilePic/${auth.currentUser.uid}/${Date.now()}`)

                await uploadBytes(profilePicRef, updateProfilePic);

                const profilePicUrl = await getDownloadURL(profilePicRef);

                // updating 

                await updateProfile(auth.currentUser, {
                    displayName: updateName,
                    photoURL: profilePicUrl
                })
                .then(() => {
                    toast.success("Profile Pic and Name Updated Successfully");
                    console.log(auth.currentUser);
                    setUpdateName("");
                    updatePicRef.current.value = "";
                    
                    setTimeout(() => {
                        navigate("/profile");
                    }, 1000)

                })
                .catch((e) => {
                    toast.error(e);
                })

                setLoading(false);



            }catch(e){
                toast.error(e.message);
                setLoading(false);
            }
        }else{
            if(updateName === ""){
                toast.error("Enter a Name");
            }else if(!updateProfilePic){
                toast.error("Select your Profile Pic");
            }

            setLoading(false);
        }
        
    }



    return(
        <div>
            <HeaderWithLogout/>

            <div className="update-profile-cont">
                <h1 className="update-prof">Update Profile Pic & Name</h1>
                <div className="update-profile-card">
                    <div className="update-prof-input">
                        <FileInput accept= {'image/*'} ref = {updatePicRef} id = "profile-img" fileHandleFunc = {profileImageHandle}  text = "Set Profile Pic"/>
                    </div>

                    <div className="update-prof-input">
                        <Input state = {updateName} setState={setUpdateName} value = {updateName} placeholder= "Update Display Name" required={true} type = "text"/>
                    </div>

                    <Button text  = {loading ? "Loading..." : "Update"} onClick = {handlePicAndNameUpdate} disabled = {loading} />
                    
                </div>
                
            </div>
        </div>
    )
}

export default UpdateProfilePicAndName;