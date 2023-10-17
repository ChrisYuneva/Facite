import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialTypeCardList, Task} from "../types/types";
import uId from "../../utils/utils";

const initialState: initialTypeCardList = {
    toDoList: [],
    isLoading: false,
    errorMessage: ''
};

export const cardListSlice = createSlice({
    name: 'cardList',
    initialState,
    reducers: {
        add(state, action: PayloadAction<Task>) {
            state.toDoList.unshift({id: uId(), content: action.payload.content, date: action.payload.date, fulfillment: action.payload.fulfillment});
        },
        update(state, action: PayloadAction<Task>) {
            state.toDoList.filter((item) => {
                if(item.id === action.payload.id) {
                    item.content = action.payload.content;
                    item.date = action.payload.date;
                    item.fulfillment = action.payload.fulfillment;
                }
            });
            state.toDoList.sort((a, b) => +a.fulfillment - +b.fulfillment);
        },
        deleteTask(state, action: PayloadAction<Task>) {
            state.toDoList = state.toDoList.filter((item) => item.id !== action.payload.id);
        },
    }
});
