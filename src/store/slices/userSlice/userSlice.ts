import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {initialTypeUser, User} from '../../types/types';

const initialState: initialTypeUser = {
    email: '',
    token: '',
    id: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        }, 
        removeUser(state) {
            state.email = '';
            state.token = '';
            state.id = '';
        }
    }
});