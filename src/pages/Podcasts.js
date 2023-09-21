import React, { useEffect, useState } from "react";
import ReactDOM  from "react-dom";
import HeaderWithLogout from "../components/HeaderWithLogout";
import "../index.css"
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { setPodcasts } from "../slices/podcastSlice";
import { db } from "../firebase";
import PodcastCard from "../components/PodcastCard";
import PodcastSearch from "../components/PodcastSearch";


const Podcasts = () => {

    const [search, setSearch] = useState("");

    const dispatch = useDispatch();

    let podcastsArr = useSelector((state) => state.podcasts.podcasts);

    console.log("podcasts", podcastsArr);

    useEffect(() =>{
        
        async function getPodcastsfromDb(){
            const querySnapshot = await getDocs(collection(db, "podcasts"));


            let podcastsDataFromDb = [];

            querySnapshot.forEach((eachDoc) => {
                podcastsDataFromDb.push({id:eachDoc.id, ...eachDoc.data()});
            })

            dispatch(setPodcasts(podcastsDataFromDb));
            
        }
        
       getPodcastsfromDb();
       
    }, [dispatch]);

    let filteredOnSearch  = podcastsArr.filter((each) => each.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

    return (
        <div>
            <HeaderWithLogout/>
            <div className="podcast-cont">
                <h2>Discover Podcasts</h2>
                <PodcastSearch state={search} setState={setSearch} placeholder="Search By Title" type="text" required= "false"/>
                {
                    filteredOnSearch && filteredOnSearch.length > 0 ? 
                    <div className="podcast-flex-cont">
                        <div className="podcasts-flex">
                            {
                                filteredOnSearch.map((eachPodcast) => (
                                    <div>
                                        <PodcastCard title = {eachPodcast.title} id = {eachPodcast.id} displayImage={eachPodcast.displayImageUrl}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                    
                    :
                    
                    <div>
                        
                        {
                            search ? <p className="no-podcast-found">No Podcast Found</p> : <p className="no-podcast-found">Sorry! You have no Podcasts</p>
                        } 

                    </div>


                }
            </div>
        </div>
    )
}

export default Podcasts;