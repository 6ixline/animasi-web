import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import axios from 'axios';
// @ts-ignore
import logo from './assets/logo.png';
import './App.css';

const cleanHTML= (html: string, letterCount: number) => {
  return html.replace(/<[^>]*>?/gm, "").substring(0, letterCount) + "...";
};

function App() {

  const [trendingAnime, setTrendingAnime] = useState([]);
  useEffect(()=>{
    async function getTrendingAnime (){
      try {
        const data = await axios.get("https://consumet-api.herokuapp.com/meta/anilist/trending");
        const results = data.data.results;
        console.log(results)
        if(results.length > 0){
          await setTrendingAnime(results);          
        }

      } catch (error) {
        console.log(error)        
      }
    }
    getTrendingAnime();
  }, [])

  return (
    <div className='bg-slate-900' style={{ minHeight: "100vh"}}>
    
      <Swiper
       className="lg:ml-0 flex h-full relative "
       slidesPerView={1}
       modules={[Pagination]}
       loop={true}
       pagination={{ clickable: true }}
    >
      <img src={logo} className='w-12 rounded-lg absolute top-5 left-5 z-40' alt="" />

      {
       trendingAnime && trendingAnime.map((item:any)=>{
          if (item.cover.includes("banner")) {
          return (
          <SwiperSlide key={item.id}>
            <div className='rounded-xl p-3 lg:h-[26rem] h-[18rem] w-full pb-8 flex justify-center relative'>
              <div className="relative h-full z-50 w-full flex justify-start items-start">
                <img src={item.cover}  className="h-full rounded-lg " alt="" />
                <p className='top-20 text-white font-noraml z-20 text-4xl left-10 absolute'>{item.title.english}</p>
                <p className='top-40 w-2/4 text-white font-noraml z-20 text- left-10 absolute'>{cleanHTML(item.description, 700)}</p>
                <div className="dark-gradient-banner z-10 rounded-xl absolute w-full h-full">.</div>
              </div>
            </div>
          </SwiperSlide>
        )
          }
        })
      }
    </Swiper>
    </div>
  );
}

export default App;
