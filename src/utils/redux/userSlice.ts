import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiUserModel } from "../interfaces/Users";


interface UserState {
    user: ApiUserModel[],
    editMode: boolean,
    profileImage: File | null,
    userName: string,
    role: string,
    biography: string,
}

const initialState: UserState = {
    user: [],
    editMode: false,
    profileImage: null,
    userName: '',
    role: '',
    biography: ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAPIUserData: (state, action: PayloadAction<ApiUserModel[]>) => {
            state.user = action.payload;
        },
        setEditMode: (state, action: PayloadAction<boolean>) => {
            state.editMode = action.payload;
        },
        setProfileImage: (state, action: PayloadAction<File>) => {
            state.profileImage = action.payload;
        },
        setEditedName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
        setEditedRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload
        },
    }
});

export const {
    setAPIUserData,
    setEditMode,
    setProfileImage,
    setEditedName,
    setEditedRole } = userSlice.actions;
export default userSlice.reducer;