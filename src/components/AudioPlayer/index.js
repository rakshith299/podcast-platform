import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {FaPlay, FaPause, FaVolumeUp, FaVolumeMute} from "react-icons/fa";
import {AiOutlineStepForward, AiOutlineStepBackward} from "react-icons/ai";
import {RiCloseCircleFill} from "react-icons/ri";


const AudioPlayer = ({audiosrc, imagesrc, closePlayer}) =>{
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMute, setIsMute] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);

    function handleDurationChange(e){
        setCurrentTime(e.target.value);
        audioRef.current.currentTime = e.target.value;
    }

    function handleVolume(e){
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    }

    function toggleMute(){
        if(isMute){
            
            setIsMute(false)
            setVolume(1)
        }else{
            setIsMute(true)
            setVolume(0)
        }
    }


    function togglePlayPause(){
        if(isPlaying){
            setIsPlaying(false)
        }else{
            setIsPlaying(true)
        }
    }

    useEffect(() =>{
        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() =>{
        if(!isMute){
            audioRef.current.volume = volume;
        }else{
            audioRef.current.volume = 0;
        }
    }, [isMute]);

    useEffect(() => {
        const audioEle = audioRef.current;
        audioEle.addEventListener("timeupdate", handleTimeUpdate)
        audioEle.addEventListener("loadedmetadata", handleLoadedMetadata)
        audioEle.addEventListener("ended", handleEnded)

        return () => {
            audioEle.removeEventListener("timeupdate", handleTimeUpdate)
            audioEle.removeEventListener("loadedmetadata", handleLoadedMetadata)
            audioEle.removeEventListener("ended", handleEnded)
        }
        
    },[])

    function handleTimeUpdate(){
        setCurrentTime(audioRef.current.currentTime);
    }

    function handleLoadedMetadata(){
        setDuration(audioRef.current.duration);
    }

    function handleEnded(){
        setCurrentTime(0);
        setIsPlaying(false);
    }

    //time update 

    function formatDate(time){
        let min = Math.floor(time / 60);
        let sec = Math.floor(time  % 60);

        return `${min}: ${sec < 10 ? "0" : ""}${sec}`;
    }

    // skip 

    function handleSkip10Sec(){
        setCurrentTime(audioRef.current.currentTime = audioRef.current.currentTime + 10);
    }

    function handlePrev10Sec(){
        setCurrentTime(audioRef.current.currentTime = audioRef.current.currentTime - 10);

    }

   //close 


   function handleClose(){
        closePlayer()
    }



    return(
        <div>  
            
            <div className="audio-player-cont">
                <div className="audio-features">  
                    <img src = {imagesrc} className="audio-img" />
                    <audio src = {audiosrc} ref={audioRef}/>
                    <p onClick={togglePlayPause} className="audio-cursor">
                        {
                            isPlaying ? <FaPause/> : <FaPlay/>
                        }
                    </p>

                    <div className="skip-cont">
                        <p onClick={handlePrev10Sec} className="skip-para"><AiOutlineStepBackward/></p>
                        <p onClick={handleSkip10Sec} className="skip-para"><AiOutlineStepForward/></p>
                    </div>


                    <div className="audio-duration-cont">
                        <p>{formatDate(currentTime)}</p>
                        <input type = "range" className="range-input" onChange={handleDurationChange} max={duration} step = {0.01} value={currentTime}/>
                        <p>-{formatDate(duration - currentTime)}</p>
                    </div>

                    <div className="vol-cont">
                        <p onClick={toggleMute} className="audio-cursor">
                            {
                                isMute ?  <FaVolumeMute/>: <FaVolumeUp/>
                            }
                        </p>

                        <input type = "range" value = {volume} onChange={handleVolume} min = {0} max={1} step={0.01} className="volume"/>
                    </div>

                </div>

                <div>
                    <p className="close" onClick={handleClose}><RiCloseCircleFill/></p> 
                </div>


            </div>

        </div>
    )
}

export default AudioPlayer;