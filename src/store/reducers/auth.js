// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  user: {}
};

// ==============================|| SLICE - MENU ||============================== //

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    }
  }
});

export default auth.reducer;

export const { setUser } = auth.actions;
