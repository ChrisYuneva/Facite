import { configureStore } from '@reduxjs/toolkit';
import {cardListSlice} from './cardListSlice/cardListSlice';

export const store = configureStore({
    reducer: {
        cardList: cardListSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;