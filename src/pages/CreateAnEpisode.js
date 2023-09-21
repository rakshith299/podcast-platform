import React, { useState } from "react";
import ReactDOM from "react-dom";
import HeaderWithLogout from "../components/HeaderWithLogout";
import Input from "../components/Input";
import FileInput from "../components/FileInput";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateAnEpisode = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [audioFile, setAudioFile] = useState(null);
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let {id} = useParams();

    function handleAudioFile(file){
        setAudioFile(file);
    }

    async function handleCreateEpisodeBtn(){
        if(title !== "" && desc !== "" && audioFile && id){

            try{
                setLoading(true)

                let episodeRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);

                await uploadBytes(episodeRef, audioFile);

                let audioURL = await getDownloadURL(episodeRef);

                let episodeData = {
                    title: title,
                    description: desc,
                    audioFile: audioURL
                };

                const episodeRefInDb = await addDoc(collection(db, "podcasts", `${id}`, "episodes"), episodeData);
                
                setTitle("");
                setDesc("");
                setAudioFile(null);


                toast.success("Episode created Successfully");

                // navigate to podcast details 
                
                setTimeout(() => {
                    navigate(`/podcast/${id}`);

                }, 1000)

                
            }catch(e){
                toast.error(e.message);
                setLoading(false)
            }
        }else{
            if(title === ""){
                toast.error("Enter Title for Episode")
            }else if(desc === ""){
                toast.error("Enter Description for Episode")
            }else if(!audioFile){
                toast.error("Select an Audio File")
            }
            setLoading(false);
        }
    }

    return (
        <div>
            <HeaderWithLogout/>
            <div className="input-wrapper">
                <h1>Create an Episode</h1>

                <Input state = {title} setState={setTitle} type = "text" placeholder= "Enter Title" required={true} />
                <Input state = {desc} setState={setDesc} type = "text" placeholder= "Enter Description" required={true} />
                <FileInput accept= "audio/*" type = "file" id = "create-an-episode" fileHandleFunc={handleAudioFile} text = "Upload Audio File"/>
                <Button text = {loading ? "Loading..." : "Create an Episode"} onClick={handleCreateEpisodeBtn} disabled = {loading}/>
            </div>
        </div>
    )
}

export default CreateAnEpisode;