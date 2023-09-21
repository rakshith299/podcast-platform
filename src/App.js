import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import StartAPodcast from "./pages/StartAPodcast";
import Podcasts from "./pages/Podcasts";
import PodcastDetails from "./pages/PodcastDetails";
import CreateAnEpisode from "./pages/CreateAnEpisode";
import UpdateProfile from "./pages/UpdateProfile";
import UpdateProfilePicAndName from "./pages/UpdateProfilePicAndName";
import UpdateEmail from "./pages/UpdateEmail";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";

const App = () => {

  let dispatch = useDispatch();


  useEffect(() => {
    
    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {
      if(user){
        const unSubscribeSnapshot = onSnapshot(doc(db, "users", user.uid),(userDoc) => {
          if(userDoc.exists()){
            const userData = userDoc.data();

            dispatch(setUser({
              name: userData.name,
              email: userData.email,
              uid: userData.uid,
            }))
          }
        }, (error) => {
          toast.error("Error, while getting user data", error);
        });

        return () => {
          unSubscribeSnapshot();
        }
      }
    })

    return () => {
      unSubscribeAuth();
    }

  }, [])

  
  return(
    <div>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Signup/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route element = {<ProtectedRoute/>}>
            <Route path = "/profile" element = {<Profile/>}/>
            <Route path = "/start-a-podcast" element = {<StartAPodcast/>} />
            <Route path = "/podcasts" element = {<Podcasts/>} />
            <Route path = "/podcast/:id" element = {<PodcastDetails/>} />
            <Route path = "/podcast/:id/create-episode" element = {<CreateAnEpisode/>} />
            <Route path = "/update-profile" element = {<UpdateProfile/>} />
            <Route path = "/update-profile-pic-name" element = {<UpdateProfilePicAndName/>} />
            <Route path = "/update-email" element = {<UpdateEmail/>} />
            <Route path = "/update-password" element = {<UpdatePasswordPage/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;