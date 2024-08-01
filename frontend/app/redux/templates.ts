import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { templates } from "./db"

const initialState: any = {};

export const thunkGetTemplates = () => async (dispatch: any) => {
    dispatch(templatesSlice.actions.setTemplate(templates));
    return templates
};

export const addTemplate = (template: void) => async (dispatch: any) => {
    dispatch(templatesSlice.actions.addTemplates(template));
    return template
};

export const templatesSlice = createSlice({
    name: "templates",
    initialState,
    reducers: {
        setTemplate: (state, action: PayloadAction) => {
            state.data = action.payload
            const combinations: any = {}
            for (const template of Object.values(action.payload)) {
                if (!combinations[template.subject]) {
                    combinations[template.subject] = new Set()
                }
                combination[template.subject].add(template.body)
            }
            state.combinations = combinations
        },
        addTemplates: (state, action: PayloadAction) => {
            const newState = { ...state }
            if (!newState.combinations[action.payload.subject]) {
                newState.combinations[action.payload.subject] = new Set()
            }
            newState.combinations[action.payload.subject].add(action.payload.body)
            newState.data[action.payload.id] = action.payload
            state = newState
            return newState
        }
    }
});

export const { setTemplate, addTemplates } = templatesSlice.actions;
export const templatesReducer = templatesSlice.reducer;