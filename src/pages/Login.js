import React, { useState } from "react";
import ReactDOM from "react-dom";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db} from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    let dispatch = useDispatch();

    

    async function handleLogin(){
        console.log("Logged in")

        if(email === ""){
            toast.error("Email cannot be empty")
        }else if(password === ""){
            toast.error("Password cannot be empty")
        }
        else{
            if(password.length < 8){
                toast.error("Password should contain atleast 8 characters")
            }else{
                try{
                    // loading 
                    setLoading(true);

                    // setting log in credential 

                    const userCredential = await signInWithEmailAndPassword(auth, email,password);
                    const user = userCredential.user;

                    // getting details from doc 

                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    const userData = userDoc.data();

                    console.log(userDoc, "from login");

                    //dispatch action 

                    dispatch(setUser({
                        name: userData.name,
                        email: userData.email,
                        uid: userData.uid,
                        
                    }))

                    //loading 

                    setLoading(false);

                    //message

                    toast.success("Log in Successful")

                    // navigate 

                    setTimeout(() => {
                        navigate("/profile")
                    }, 1000)

                }catch(e){
                    console.log("error", e);
                    toast.error(e.message);
                    setLoading(false);
                }
            }
        }
    }

    function onSignup(){
        setTimeout(() => {
            navigate("/");
        }, 1000)
    }

    return(
        <div>
            <Header/>

            <div className="input-wrapper">
                <h1>Log In</h1>            
                <Input state = {email} setState={setEmail} placeholder= "Email" required={true} type = "email"/>
                <Input state = {password} setState={setPassword} placeholder= "Password" required={true} type = "password"/>
            
                
                <Button text = {loading ? "Loading..." : "Log In"} onClick={handleLogin} disabled={loading}/>

                <p className="text">Don't have an account? <span className="t-span" onClick={onSignup}>Sign up</span></p>

            </div>
        </div>
    )
}

export default Login;