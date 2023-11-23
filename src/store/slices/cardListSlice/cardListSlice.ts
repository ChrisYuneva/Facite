import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {initialTypeCardList, Task} from './types';

const initialState: initialTypeCardList = {
    toDoList: [],
    dbId: '',
    isLoading: false,
    errorMessage: ''
};

export const cardListSlice = createSlice({
    name: 'cardList',
    initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        getToDoList(state, action: PayloadAction<Task[]>) {
            state.toDoList = action.payload;
            state.isLoading = false;
        },
        setId(state, action: PayloadAction<string>) {
            state.dbId = action.payload;
        },
        add(state, action: PayloadAction<Task>) {
            state.toDoList.unshift(action.payload);
        },
        update(state, action: PayloadAction<Task>) {
            state.toDoList.filter((item) => {
                if(item.id === action.payload.id) {
                    item.content = action.payload.content;
                    item.date = action.payload.date;
                    item.fulfillment = action.payload.fulfillment;
                    item.priority = action.payload.priority;
                }
            });
            state.toDoList.sort((a, b) => +a.fulfillment - +b.fulfillment);
        },
        deleteTask(state, action: PayloadAction<Task>) {
            state.toDoList = state.toDoList.filter((item) => item.id !== action.payload.id);
        },
        resetToDoList(state) {
            state.dbId = '';
            state.errorMessage = '';
            state.isLoading = false;
            state.toDoList = [];
        }
    }
});
