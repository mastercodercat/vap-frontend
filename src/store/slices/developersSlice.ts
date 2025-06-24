import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAuthHeaders } from "../../utils/authPersistence";
import { debugFormData, validateFormData } from "../../utils/debugFormData";

const API_URL = import.meta.env.VITE_API_URL;

// Types
export interface Developer {
  id: string;
  name: string;
  link: string;
}

interface DevelopersState {
  developers: Developer[];
  isLoading: boolean;
  error: string | null;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  editingDeveloper: Developer | null;
}

const initialState: DevelopersState = {
  developers: [],
  isLoading: false,
  error: null,
  isAddDialogOpen: false,
  isEditDialogOpen: false,
  editingDeveloper: null,
};

// Async thunks
export const fetchDevelopers = createAsyncThunk(
  "developers/fetchDevelopers",
  async () => {
    const response = await fetch(`${API_URL}/developers`, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch developers");
    }

    const data = await response.json();
    return data;
  }
);

export const addDeveloper = createAsyncThunk(
  "developers/addDeveloper",
  async (developerData: { name: string; file: File }) => {
    const formData = new FormData();
    formData.append("name", developerData.name);
    formData.append("resume", developerData.file);

    // Debug FormData
    debugFormData(formData);
    validateFormData(formData, ["name", "resume"]);

    console.log("Sending request to:", `${API_URL}/developers`);
    console.log("Request method: POST");
    console.log("Headers:", getAuthHeaders());

    const response = await fetch(`${API_URL}/developers`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
      body: formData,
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error(errorData.message || "Failed to add developer");
    }

    const data = await response.json();
    return data;
  }
);

export const updateDeveloper = createAsyncThunk(
  "developers/updateDeveloper",
  async ({
    id,
    developerData,
  }: {
    id: string;
    developerData: { name: string; file?: File };
  }) => {
    const formData = new FormData();
    formData.append("name", developerData.name);
    if (developerData.file) {
      formData.append("resume", developerData.file);
    }

    // Debug FormData
    debugFormData(formData);
    const expectedFields = developerData.file ? ["name", "resume"] : ["name"];
    validateFormData(formData, expectedFields);

    console.log("Sending request to:", `${API_URL}/developers/${id}`);
    console.log("Request method: PUT");

    const response = await fetch(`${API_URL}/developers/${id}`, {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
      body: formData,
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error(errorData.message || "Failed to update developer");
    }

    const data = await response.json();
    return data;
  }
);

const developersSlice = createSlice({
  name: "developers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    openAddDialog: (state) => {
      state.isAddDialogOpen = true;
      state.error = null;
    },
    closeAddDialog: (state) => {
      state.isAddDialogOpen = false;
      state.error = null;
    },
    openEditDialog: (state, action: PayloadAction<Developer>) => {
      state.isEditDialogOpen = true;
      state.editingDeveloper = action.payload;
      state.error = null;
    },
    closeEditDialog: (state) => {
      state.isEditDialogOpen = false;
      state.editingDeveloper = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Developers
      .addCase(fetchDevelopers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchDevelopers.fulfilled,
        (state, action: PayloadAction<Developer[]>) => {
          state.isLoading = false;
          state.developers = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch developers";
      })
      // Add Developer
      .addCase(addDeveloper.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addDeveloper.fulfilled,
        (state, action: PayloadAction<Developer>) => {
          state.isLoading = false;
          state.developers.push(action.payload);
          state.isAddDialogOpen = false;
          state.error = null;
        }
      )
      .addCase(addDeveloper.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to add developer";
      })
      // Update Developer
      .addCase(updateDeveloper.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateDeveloper.fulfilled,
        (state, action: PayloadAction<Developer>) => {
          state.isLoading = false;
          const index = state.developers.findIndex(
            (dev) => dev.id === action.payload.id
          );
          if (index !== -1) {
            state.developers[index] = action.payload;
          }
          state.isEditDialogOpen = false;
          state.editingDeveloper = null;
          state.error = null;
        }
      )
      .addCase(updateDeveloper.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update developer";
      });
  },
});

export const {
  clearError,
  openAddDialog,
  closeAddDialog,
  openEditDialog,
  closeEditDialog,
} = developersSlice.actions;

export default developersSlice.reducer;
