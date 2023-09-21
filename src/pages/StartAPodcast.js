import React, { useRef, useState } from "react";
import  ReactDOM  from "react-dom";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import FileInput from "../components/FileInput";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import HeaderWithLogout from "../components/HeaderWithLogout";
import { useNavigate, useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

const StartAPodcast = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState("");
    const [displayImg, setDisplayImg] = useState("");
    const [bannerImg, setBannerImg] = useState("");

    const displayRef = useRef();
    const bannerRef = useRef();

    const navigate = useNavigate();



    async function handleCreatePodcast(){
        if(title && desc && displayImg && bannerImg){

            try{

                setLoading(true);

                // for display Image
                const displayImgRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`)

                await uploadBytes(displayImgRef, displayImg);

                const displayImgUrl = await getDownloadURL(displayImgRef);

                // for Banner Image

                const bannerImgRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`)

                await uploadBytes(bannerImgRef, bannerImg);

                const bannerImgUrl = await getDownloadURL(bannerImgRef);

                // creating new doc

                const podcastData = {
                    title: title,
                    description: desc,
                    displayImageUrl: displayImgUrl,
                    bannerImageUrl: bannerImgUrl,
                    createdBy: auth.currentUser.uid
                }

                const docref = await addDoc(collection(db, "podcasts"), podcastData)

                // making all input values empty

                setTitle("");
                setDesc("");
                setDisplayImg(null);
                setBannerImg(null);       

                toast.success("Podcast created Successfully");

                setLoading(false)

                setTimeout(() => {
                    navigate("/podcasts");
                }, 1000);


            }catch(e){
                toast.error(e.message);
                console.log(e);
                setLoading(false);
                
            }
            

            
        }else{
            if(title === ""){
                toast.error("Enter Title for your Podcast")
            }else if(desc === ""){
                toast.error("Enter Short Description for your Podcast")
            }else if(!displayImg){
                toast.error("Select a display Image for your Podcast")
            }else if(!bannerImg){
                toast.error("Select a Banner Image for your Podcast")
            }

            setLoading(false);
        }
    }

    function displayImgFileHandle(file){
        setDisplayImg(file)
    }

    function bannerImgFileHandle(file){
        setBannerImg(file)
    }

    return (
        <div>
            <HeaderWithLogout/>

            <div className="input-wrapper">
                <h1>Create a Podcast </h1>
                <Input state = {title} setState={setTitle} placeholder= "Title" required={true} type = "text"/>
                <Input state = {desc} setState={setDesc} placeholder= "Description" required={true} type = "text"/>
                <FileInput accept= {'image/*'} id = "display-img" fileHandleFunc = {displayImgFileHandle}  text = "Click to Select Display Image" value = {displayImg}  />
                <FileInput accept= {'image/*'} id = "banner-img" fileHandleFunc = {bannerImgFileHandle}  text = "Click to Select Banner Image" value = {bannerImg}/>
                
                <Button text = {loading ? "Loading..." : "Create A Podcast"} onClick={handleCreatePodcast} disabled = {loading}/>

                
            </div>
        </div>
    )
}

export default StartAPodcast;