import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload; // ✅ sync updated user
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, updateUserSuccess } =
  userSlice.actions;

export default userSlice.reducer;
