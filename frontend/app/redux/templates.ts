import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { templates } from "./db"

const initialState: any = {};

export const thunkGetTemplates = () => async (dispatch: any) => {
    dispatch(templatesSlice.actions.setTemplates(templates));
    return templates
};

export const addTemplate = (template: any) => async (dispatch: any) => {
    dispatch(templatesSlice.actions.addTemplates(template));
    return template
};

export const templatesSlice = createSlice({
    name: "templates",
    initialState,
    reducers: {
        setTemplates: (state, action: PayloadAction<any>) => {
            state.data = action.payload
            const combinations: any = {}
            for (const template of Object.values(action.payload)) {
                if (!combinations[template.subject]) {
                    combinations[template.subject] = {}
                }
                combinations[template.subject][template.body] = template.id
            }
            state.combinations = combinations
        },
        addTemplates: (state, action: PayloadAction<any>) => {
            const newState = { ...state }
            if (!newState.combinations[action.payload.subject]) {
                newState.combinations[action.payload.subject] = {}
            }
            newState.combinations[action.payload.subject][action.payload.body] = action.payload.id
            newState.data[action.payload.id] = action.payload
            state = newState
            console.log(newState)
        }
    }
});

export const { setTemplates, addTemplates } = templatesSlice.actions;
export const templatesReducer = templatesSlice.reducer;