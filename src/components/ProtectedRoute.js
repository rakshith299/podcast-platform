import React from "react";
import ReactDOM from "react-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {FidgetSpinner} from "react-loader-spinner";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = () => {
    const [user, loading, error] = useAuthState(auth);

    if(loading){
        return <Loader/>
    }else if(!user || error){
        return <Navigate to = "/" />
    }else{
        return <Outlet/>
    }
}



export default ProtectedRoute;