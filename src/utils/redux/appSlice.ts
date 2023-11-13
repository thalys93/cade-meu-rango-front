import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appStates {
    success: boolean;
    infoMSG: string;
    resStatus: number;
    resOk: boolean;
    error: boolean;
    loading: boolean;
    show: boolean;   
}

const initialState: appStates = {
    success: false,
    infoMSG: '',
    resStatus: 0,
    resOk: false,
    error: false,
    loading: false,    
    show: false,
}

const appSlice = createSlice({
    name: "states",
    initialState,
    reducers: {
        setStates: (state, action: PayloadAction<Partial<appStates>>) => {
            return { ...state, ...action.payload };
        },  
    },
});

export const { 
    setStates       
    } = appSlice.actions;

export default appSlice.reducer;