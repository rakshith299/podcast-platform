import React, { useState } from "react";
import HeaderWithLogout from "../components/HeaderWithLogout";
import Input from "../components/Input";
import { updateEmail } from "firebase/auth";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const UpdateEmail = () => {

    const [updatedEmail, setUpdatedEmail] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    
    async function handleUpdateEmail(){
        if(updatedEmail !== ""){
            try{
                
                setLoading(true);
                
                await updateEmail(auth.currentUser, updatedEmail)
                .then(() => {

                    toast.success("Email Updated Successfully")
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
            toast.error("Enter your new Email");
            setLoading(false);
        }
        
    }

    return(
        <div>
            <HeaderWithLogout/>

            <div className="update-email-cont">
                <div className="update-email-card">
                    <h1 className="update-email">Update Email</h1>
                    <div className="update-prof-input">
                        <Input type = "email" placeholder = "Enter Your New Email" required = "true" state = {updatedEmail} setState = {setUpdatedEmail} />
                        <Button text  = {loading ? "Loading..." : "Update"} onClick = {handleUpdateEmail} disabled = {loading} />
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default UpdateEmail;