import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isSignInDialogOpen: boolean;
  isSignUpDialogOpen: boolean;
  isLoading: boolean;
}

const initialState: UIState = {
  isSignInDialogOpen: false,
  isSignUpDialogOpen: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSignInDialog: (state) => {
      state.isSignInDialogOpen = true;
      state.isSignUpDialogOpen = false;
    },
    closeSignInDialog: (state) => {
      state.isSignInDialogOpen = false;
    },
    openSignUpDialog: (state) => {
      state.isSignUpDialogOpen = true;
      state.isSignInDialogOpen = false;
    },
    closeSignUpDialog: (state) => {
      state.isSignUpDialogOpen = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  openSignInDialog,
  closeSignInDialog,
  openSignUpDialog,
  closeSignUpDialog,
  setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
