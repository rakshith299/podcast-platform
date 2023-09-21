import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import HeaderWithLogout from "../components/HeaderWithLogout";
import Episode from "../components/Episode";
import AudioPlayer from "../components/AudioPlayer";
import {RiCloseCircleFill} from "react-icons/ri";

const PodcastDetails = () => {

    let {id} = useParams();
    const [podcastdetails, setPodcastdetails] = useState({}); 

    const [episodes, setEpisodes] = useState([]); 

    const [playingFile, setPlayingFile] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        async function getPodcastDetails(){
            if(id){
                try{

                    let receivedDetails = await getDoc(doc(db, "podcasts", id));

                    if(receivedDetails.exists()){
                        console.log(receivedDetails.data());

                        setPodcastdetails({id: id, ...receivedDetails.data()});
                    }else{
                        toast.error("Sorry Unable to get Podcast Details.");
                        setTimeout(() => {
                            navigate("/podcasts");
                        }, 1000);
                    }

                }catch(e){
                    toast.error(e.message);
                }
            }
        }

        getPodcastDetails()
    }, [id])


    useEffect(() => {
        async function getAllEpisodes(){
            let episodesArrayReceived = await getDocs(collection(db, "podcasts", id, "episodes"));

            let allEpisodes = [];

            episodesArrayReceived.forEach((doc) => {
                allEpisodes.push({id: doc.id, ...doc.data()})
            })

            setEpisodes(allEpisodes);

        }

        getAllEpisodes();
    },[id])

    // selecting new file 

    function selectNewFileToPlay(file){
        if(playingFile){
            toast.error("Close Current Audio Player to Play another")
        }else{
            setPlayingFile(file);
        }
    }

    // close 

    


    console.log(episodes);
    console.log(podcastdetails, "podcast-details");
    let totalNoOfepisode = episodes.length;


    return(
        <div>
            <HeaderWithLogout/>
            {
                podcastdetails? 

                <div className="podcast-details-cont">
                    <div className="actual-podcast-details-cont">

                        <div className="podcast-details-title-btn-cont">
                            <h2 className="podcast-details-title">{podcastdetails.title}</h2>
                            {
                                podcastdetails.createdBy === auth.currentUser.uid && 
                                <button className="create-ep-btn"onClick={() => navigate(`/podcast/${id}/create-episode`)}>Create an Episode</button>
                            }
                            
                        </div>
                        

                        <div className="banner-wrapper">
                            <img src = {podcastdetails.bannerImageUrl}/>
                        </div>

                        <p className="podcast-details-desc">{podcastdetails.description}</p>

                        <h2 className="podcast-details-ep-title">Episodes</h2>

                        {
                            episodes && episodes.length > 0 ? 

                            <div>
                                {
                                    episodes.map((eachEpisode, index) => (
                                        <Episode title={eachEpisode.title} key = {index} 
                                        description={eachEpisode.description} 
                                        audioFile={eachEpisode.audioFile} 
                                        index={totalNoOfepisode = totalNoOfepisode - index}
                                        onClick={(file) => selectNewFileToPlay(file)}/>
                                    ))
                                }
                            </div> : 

                            <div className="no-episodes">
                                <p>No Episodes...</p>
                            </div>
                        }
                    </div>

                    {
                        playingFile &&
                        
                        <div>
                                          
                            <AudioPlayer audiosrc={playingFile} imagesrc={podcastdetails.displayImageUrl} closePlayer = {() => setPlayingFile(null)}/>
                        </div>
                    }
                    
                </div> : 

                <div>
                    <p>Podcast details cannot be fetched</p>
                </div>
            }
        </div>
    )
}

export default PodcastDetails;