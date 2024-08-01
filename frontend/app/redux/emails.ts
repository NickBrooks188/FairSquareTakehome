import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { emails } from "./db"

const initialState: any = {};

export const thunkGetemails = () => async (dispatch: any) => {
    dispatch(emailsSlice.actions.setemails(emails));
    return emails
};

export const addemail = (email: void) => async (dispatch: any) => {
    dispatch(emailsSlice.actions.addemails(email));
    return email
};

export const emailsSlice = createSlice({
    name: "emails",
    initialState,
    reducers: {
        setemails: (state, action: PayloadAction) => {
            state.data = action.payload
        },
        addemails: (state, action: PayloadAction) => {
            const newState = { ...state.data }
            newState[action.payload.id] = action.payload
            state.data = newState
        }
    }
});

export const { setemails, addemails } = emailsSlice.actions;
export const emailsReducer = emailsSlice.reducer;