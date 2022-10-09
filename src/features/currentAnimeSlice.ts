import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type animeType = {
    id: string,
    cover: string,
    description: string,
    duration: number,
    genres: [],
    image: string,
    malId: number,
    rating: number,
    releaseDate: number,
    status: string,
    title: {
        english: string,
        native: string,
        romaji: string,
        userPreferred: string
    },
    totalEpisodes: number,
    trailer: {
        id: string,
        site: string,
        thumbnail: string
    },
    type: string
}

interface currentAnimeState {
    anime: animeType[]
}

const initialState : currentAnimeState = {
    anime: []
}

export const currentAnimeSlice = createSlice({
    name: "currentAnime",
    initialState,
    reducers:{
        addAnime: (state, action: PayloadAction<animeType>)=>{
            state.anime = [action.payload]
        }
    }
})

export const { addAnime } = currentAnimeSlice.actions;

export default currentAnimeSlice.reducer;