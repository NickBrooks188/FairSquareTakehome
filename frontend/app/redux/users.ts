import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { users } from "./db"

const initialState: any = {};

export const thunkGetUsers = () => async (dispatch: any) => {
    dispatch(usersSlice.actions.setUsers(users));
    return users
};

export const addUser = (user: void) => async (dispatch: any) => {
    dispatch(usersSlice.actions.addUsers(user));
    return user
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<any>) => {
            state.data = action.payload
        },
        addUsers: (state, action: PayloadAction<any>) => {
            const newState = { ...state.data }
            newState[action.payload.id] = action.payload
            state.data = newState
        }
    }
});

export const { setUsers, addUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;