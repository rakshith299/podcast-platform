import React, { useState } from "react";
import HeaderWithLogout from "../components/HeaderWithLogout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {updatePassword } from "firebase/auth";
import { auth } from "../firebase";

const UpdatePasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [newConfirm, setNewConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    
    async function handleUpdatePassword(){
        if(newPassword !== "" && newConfirm !== ""){
            if(newConfirm === newPassword){
                if(newPassword.length >= 8){
        
                    try{
                        
                        setLoading(true);
                        
                        await updatePassword(auth.currentUser, newPassword)
                        .then(() => {

                            toast.success("Password Updated Successfully")
                            setLoading(false);

                            setTimeout(() => {
                                navigate("/profile");
                            }, 1000)
                        })
                        .catch((e) => {
                            toast.error(e.message);
                            setLoading(false);
                        })


                        
                    }catch(e){
                        toast.error(e.message);
                        setLoading(false);
                    }
                }else{
                    toast.error("Password should contain atleast 8 characters");
                    setLoading(false);
                }
            }else{
                toast.error("Password and Confirm Password should be Same");
                setLoading(false);
            }
        }else{
            toast.error("Both fields are necessary To fill");
            setLoading(false);
        }
        
    }


    return(
        <div>
            <HeaderWithLogout/>

            <div className="update-email-cont">
                <div className="update-email-card">
                    <h1 className="update-email">Update Password</h1>
                    <div className="update-prof-input">
                        <Input type = "password" placeholder = "Enter Your New Password" required = "true" state = {newPassword} setState = {setNewPassword} />
                        <Input type = "password" placeholder = "Re-Enter Password" required = "true" state = {newConfirm} setState = {setNewConfirm} />
                        <Button text  = {loading ? "Loading..." : "Update Password"} onClick = {handleUpdatePassword} disabled = {loading} />
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default UpdatePasswordPage;