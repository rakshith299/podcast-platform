import React, { useState } from "react";
import ReactDOM from "react-dom"
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button"; 
import "../index.css";
import { useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {db, storage, auth} from "../firebase.js";
import {setDoc, doc} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import {ToastContainer, toast} from "react-toastify";
import FileInput from "../components/FileInput";


const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState(""); 
    const [profilePicUrl, setProfilePicUrl] = useState(""); 

    let userFromRedux = useSelector((state) => state.user.user);
      

    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    let dispatch = useDispatch();

    if(userFromRedux){
       navigate("/podcasts");
        
    }

    async function handleSignup(){
        console.log("signed up");

        let nameRegex = /^[a-zA-Z ]+$/;

        if(password === cPassword && fullName !== "" && email !== "" && nameRegex.test(fullName)){
            let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if(password.length >= 8 && passwordRegex.test(password)){
                try{

                    // loading 

                    setLoading(true);

                    // creating user
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;

                    console.log("user -> ", user);

                    // storing user 

                    await setDoc(doc(db, "users", user.uid), {
                        name : fullName,
                        email: user.email,
                        uid: user.uid,
                        

                    });

                    // calling redux action 
                    
                    dispatch(setUser({
                        name : fullName,
                        email: user.email,
                        uid: user.uid,
                        
                    }))

                    // loading 

                    setLoading(false);

                    // message 

                    toast.success("Sign up Successful");

                    

                    //navigate to profile 

                    setTimeout(() => {
                        navigate("/profile")
                    }, 1000)


                }catch(e){
                    console.log("error",e);
                    toast.error(e.message);
                    setLoading(false);
                }
            }else{
                if(password.length < 8){
                    toast.error("Password should contain atleast 8 characters")
                }else if(!passwordRegex.test(password)){
                    toast.error("Password should have atleast 1 Upper case, 1 Lower Case, 1 Number, 1 Special Character")
                }
                

                setPassword("");
                setCPassword("");
            }
        }else{
            if(password !== cPassword){
                toast.error("Password and confirm Password not matching")
                setPassword("");
                setCPassword("");
            }else if(fullName === ""){
                toast.error("Name cannot be empty")
            }else if(email === ""){
                toast.error("Email cannot be empty")
            }else if(!nameRegex.test(fullName)){
                toast.error("Enter valid name");
            }
            
        }
    }

    function onLogin(){
        setTimeout(() => {
            navigate("/login");
        }, 1000)
    }

    

    return (
        <div>
            <Header/>

            <div className="input-wrapper">
                <h1>Sign up</h1>
                <Input state = {fullName} setState={setFullName} placeholder= "Full Name" required={true} type = "text"/>
                <Input state = {email} setState={setEmail} placeholder= "Email" required={true} type = "email"/>
                <Input state = {password} setState={setPassword} placeholder= "Password" required={true} type = "password"/>
                <Input state = {cPassword} setState={setCPassword} placeholder= "Confirm Password" required={true} type = "password"/>
                

                <Button text = {loading ? "Loading..." : "Sign up"} onClick={handleSignup} disabled = {loading}/>

                <p className="text">Already have an account? <span className="t-span" onClick={onLogin}>Login</span></p>
            </div>
        </div>
    )
}

export default Signup;