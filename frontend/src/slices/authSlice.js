// Importing the createSlice function from the Redux Toolkit.

import { createSlice } from "@reduxjs/toolkit";

// Defining the initial state for the slice.
const initialState = {
    userInfo: localStorage.getItem("userInfo") ?  // Checking if there is a value for "userInfo" in localStorage.
        JSON.parse(localStorage.getItem("userInfo")) : null  // If "userInfo" is found, parse it as JSON, otherwise set to null.
}


// Creating a slice of Redux state called 'authSlice'.
const authSlice = createSlice({
    name: "auth", // The name of the slice, used to generate action types.
    initialState, // The initial state defined above.

    // Reducer functions define how the state should change in response to actions.
    reducers: {
        setCredential: (state, action) => {
  // This is the reducer function for the 'setCredential' action.
    // It takes the current state and the action payload as arguments.

state.userInfo = action.payload; // Update the 'userInfo' field in the state with the new payload.
 localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Update the localStorage with the new userInfo.

        },
        logout:(state, action)=>{
            state.userInfo=null;
            localStorage.clear();
        }

    }
})

// Exporting the 'setCredential' action creator.
export const { setCredential, logout } = authSlice.actions;

// Exporting the reducer function, which will be used in the Redux store.
export default authSlice.reducer;
