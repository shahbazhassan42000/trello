import {configureStore} from "@reduxjs/toolkit";
import cardReducer, {loadBoards, loadCards} from './cardSlice';
import api from "../middleware/api";
import {user} from "../../App";



export const store = configureStore({
    reducer: {
        cards: cardReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api]
});


if (user) store.dispatch(loadBoards(user))
