import { configureStore } from '@reduxjs/toolkit';
import {cardListSlice} from './slices/cardListSlice/cardListSlice';
import { userSlice } from './slices/userSlice/userSlice';

export const store = configureStore({
    reducer: {
        cardList: cardListSlice.reducer,
        user: userSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;