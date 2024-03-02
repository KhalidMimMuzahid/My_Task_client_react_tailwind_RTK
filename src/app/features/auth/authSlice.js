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
      state.value = initialState.value;
    },
    setIsLoading: (state, value) => {
      state.value.isLoading = value;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
