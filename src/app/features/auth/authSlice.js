import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: null,
    isLoading: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, data) => {
      state.value.user = data?.payload;
      state.value.isLoading = false;
    },
    removeUser: (state) => {
      localStorage.removeItem("auth_token");
      state.value = initialState.value;
    },
    setIsLoading: (state, data) => {
      state.value.isLoading = data.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
