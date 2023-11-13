import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipModel } from "../interfaces/Tips";


interface TipState {
    tip: TipModel[],
}

const initialState: TipState = {
    tip: [],
}

const tipSlice = createSlice({
    name: "tip",
    initialState,
    reducers: {
        setTip: (state, action: PayloadAction<TipModel[]>) => {
            state.tip = action.payload;
        },
    },
});

export const { setTip } = tipSlice.actions;
export default tipSlice.reducer;