import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { RootState } from "../../app/store";

function Details() {
  const [animeDetails, setanimeDetails] = useState({});
  const currentAnime = useSelector((state: RootState)=>(state.currentAnime.anime))
  const navigate = useNavigate();
  useEffect(()=>{
   if(!currentAnime[0]){
    navigate("/");
   }else{
    const animeId = currentAnime[0].id;
    const getAnime = async (id: string)=> {
      const animeDetailsdata = await axios.get(
        `https://api.consumet.org/meta/anilist/info/${id}`
      );
      setanimeDetails(animeDetailsdata)
    }
    getAnime(animeId); 
   }
  }, [])
  return (
    <div>
       {animeDetails && <img src={animeDetails.cover} alt="" />}
    </div>
  )
}

export default Details