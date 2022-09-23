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
  const [recentAnime, setRecentAnime] = useState([]);
  useEffect(()=>{
    async function setAnimeDataHome(){
      try {
        const trendingData = await axios.get("https://consumet-api.herokuapp.com/meta/anilist/trending");
        const recentResult = await axios.get('https://consumet-api.herokuapp.com/meta/anilist/recent-episodes');
        const trendingresults = trendingData.data.results;
        const recentAnime = recentResult.data.results;
        if(trendingresults.length > 0){
          await setTrendingAnime(trendingresults);      
          await setRecentAnime(recentAnime);    
        }

      } catch (error) {
        console.log(error)        
      }
    }
    setAnimeDataHome();
  }, [])

  const currentWidth = window.innerWidth;

  return (
    <div className='bg-slate-900 p-3' style={{ minHeight: "100vh"}}>
    
    <Swiper
       className="lg:ml-0 flex h-full relative "
       slidesPerView={1}
       modules={[Pagination]}
       loop={true}
       pagination={{ clickable: true }}
    >
      <img src={logo} className='w-12 lg:w-12  rounded-lg absolute top-5 left-5 z-50' alt="" />

      {
       trendingAnime && trendingAnime.map((item:any)=>{
          if (item.cover.includes("banner")) {
          return (
          <SwiperSlide key={item.id}>
            <div className='rounded-xl  lg:h-[24rem] h-[14rem] w-full pb-8 flex justify-center relative'>
              <div className="relative h-full z-30 w-full flex justify-start items-start">
                <img src={item.cover}  className="h-full rounded-lg " alt="" />
                <p className='lg:top-20 main-title text-white font-normal z-20  lg:text-4xl lg:left-10 absolute'>{item.title.english}</p>
                <p className='top-40 lg:w-3/4 crasouelDesc text-white font-noraml z-20 text- left-10 absolute'>{cleanHTML(item.description, 700)}</p>
                <div className="dark-gradient-banner z-10 rounded-xl absolute w-full h-full"></div>
              </div>
            </div>
          </SwiperSlide>
        )
          }
        })
      }
    </Swiper>

    <h3 className='text-2xl font-semibold text-white'>Recent Anime</h3>
    <Swiper
       className="lg:ml-0 mt-5 flex h-full relative"
       slidesPerView={currentWidth < 768 ? 2 : 6}
       modules={[Pagination]}
       loop={true}
       pagination={{ clickable: true }}
       spaceBetween={10}
    >
      {
       recentAnime && recentAnime.map((item:any)=>{
          return (
          <SwiperSlide key={item.id}>
            <div className="w-full lg:mb-9 relative rounded-2xl " style={{background: `url(${item.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat",height: "360px"}}>
              <p className='absolute bottom-3 main-title text-bold px-3 z-20 text-white'>{item.title.english && cleanHTML(item.title.english, 26)}</p>
              <div className="backDropGradient z-10 rounded-xl absolute w-full h-full">.</div>
            </div>
          </SwiperSlide>
        )
        })
      }
    </Swiper>
    </div>
  );
}

export default App;
