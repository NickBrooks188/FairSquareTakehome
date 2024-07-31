import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { users } from "./db"

const initialState: any = {};

export const thunkGetSettlement = () => async (dispatch: any) => {

    dispatch(usersSlice.actions.setUsers(users));
    return users
};

export const addUser = (user: {}) => async (dispatch: any) => {
    dispatch(usersSlice.actions.addUser(user));
    return user
};

export const usersSlice = createSlice({
    name: "settlement",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction) => {
            state.data = action.payload
        },
        addUser: (state, action: PayloadAction) => {
            const newState = [...state.data]
            newState.push(action.payload)
            state.data = newState
        }
    }
});

export const { setUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;