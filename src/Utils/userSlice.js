import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState:null,
    
    reducers: {
        addUser: (state, action) => {
            return action.payload;
            // state.name = action.payload.name;
            // state.email = action.payload.email;
            // state.password = action.payload.password;
            // state.isLoggedIn = true;
        },
        removeUser: (state,action) => {
            return null;
            // state.name = "";    
            // state.email = "";
            // state.password = "";
            // state.isLoggedIn = false;
        }   
    }
}); 

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;