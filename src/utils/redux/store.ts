
import { configureStore } from '@reduxjs/toolkit';
import appStates from './appSlice';
import recipeStates from './recipeSlice';
import tipState from './tipSlice';
import userState from './userSlice';

const store = configureStore({
    reducer: {
        commonState: appStates,
        recipeState: recipeStates,
        tipState: tipState,
        userState: userState,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;