import { createSlice } from "@reduxjs/toolkit";

// Define the actual initial state object
const initialState = {
  theme: "light", // or "dark"
};

// Create the slice using createSlice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

// Export the action and reducer
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
