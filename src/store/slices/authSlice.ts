import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  saveAuthToStorage,
  validateStoredAuth,
  clearAuthFromStorage,
} from "../../utils/authPersistence";

const API_URL = import.meta.env.VITE_API_URL;

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Load initial state from localStorage with validation
const { user: savedUser, token: savedToken } = validateStoredAuth();

const initialState: AuthState = {
  user: savedUser,
  token: savedToken,
  isAuthenticated: !!savedUser && !!savedToken,
  isLoading: false,
  error: null,
};

// Async thunks
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign in failed");
    }

    const data = await response.json();
    return data;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: { name: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign up failed");
    }

    const data = await response.json();
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      clearAuthFromStorage();
    },
    // Action to restore auth state from localStorage (useful for app initialization)
    restoreAuth: (state) => {
      const { user, token } = validateStoredAuth();
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!user && !!token;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
          // Save to localStorage
          saveAuthToStorage({
            user: action.payload.user,
            token: action.payload.token,
          });
        }
      )
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Sign in failed";
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
          // Save to localStorage
          saveAuthToStorage({
            user: action.payload.user,
            token: action.payload.token,
          });
        }
      )
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Sign up failed";
      });
  },
});

export const { clearError, signOut, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
