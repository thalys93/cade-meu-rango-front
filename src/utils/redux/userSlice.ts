import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiUserModel } from "../interfaces/Users";


interface UserState {
    user: ApiUserModel,
    editMode: boolean
    profileImage: File | null
}

const initialState: UserState = {
    user: {} as ApiUserModel,
    editMode: false,
    profileImage: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAPIUserData: (state, action: PayloadAction<ApiUserModel>) => {
            state.user = action.payload;
        },
        setEditMode: (state, action: PayloadAction<boolean>) => {
            state.editMode = action.payload;
        },
        setProfileImage: (state, action: PayloadAction<File>) => {
            state.profileImage = action.payload;
        }
    }
});

export const { setAPIUserData, setEditMode, setProfileImage  } = userSlice.actions;
export default userSlice.reducer;