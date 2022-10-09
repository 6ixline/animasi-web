import { configureStore } from "@reduxjs/toolkit";
import currentAnimeReducer from "../features/currentAnimeSlice";



export const store = configureStore({
    reducer: {
        currentAnime: currentAnimeReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch