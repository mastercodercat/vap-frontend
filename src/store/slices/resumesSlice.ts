import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAuthHeaders } from "../../utils/authPersistence";

const API_URL = import.meta.env.VITE_API_URL;

// Types
export interface Resume {
  id: string;
  jobDescription: string;
  title: string;
  skills: string | null;
  resumeUrl: string;
  developerId: string;
  createdAt: string;
  developer: {
    id: string;
    name: string;
    link: string;
  };
}

interface ResumesState {
  resumes: Resume[];
  filteredResumes: Resume[];
  isLoading: boolean;
  error: string | null;
  filters: {
    search: string;
    developerId: string;
    skills: string[];
  };
}

const initialState: ResumesState = {
  resumes: [],
  filteredResumes: [],
  isLoading: false,
  error: null,
  filters: {
    search: "",
    developerId: "",
    skills: [],
  },
};

// Async thunks
export const fetchResumes = createAsyncThunk(
  "resumes/fetchResumes",
  async () => {
    const response = await fetch(`${API_URL}/resumes`, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch resumes");
    }

    const data = await response.json();
    return data;
  }
);

export const generateResume = createAsyncThunk(
  "resumes/generateResume",
  async (resumeData: {
    jobDescription: string;
    developerId: string;
    docType: string;
  }) => {
    const response = await fetch(`${API_URL}/resumes/generate`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resumeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate resume");
    }

    const data = await response.json();
    return data;
  }
);

const resumesSlice = createSlice({
  name: "resumes",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.filteredResumes = applyFilters(state.resumes, state.filters);
    },
    setDeveloperFilter: (state, action: PayloadAction<string>) => {
      state.filters.developerId = action.payload;
      state.filteredResumes = applyFilters(state.resumes, state.filters);
    },
    setSkillsFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.skills = action.payload;
      state.filteredResumes = applyFilters(state.resumes, state.filters);
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        developerId: "",
        skills: [],
      };
      state.filteredResumes = state.resumes;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Resumes
      .addCase(fetchResumes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchResumes.fulfilled,
        (state, action: PayloadAction<Resume[]>) => {
          state.isLoading = false;
          state.resumes = action.payload;
          state.filteredResumes = applyFilters(action.payload, state.filters);
          state.error = null;
        }
      )
      .addCase(fetchResumes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch resumes";
      })
      // Generate Resume
      .addCase(generateResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        generateResume.fulfilled,
        (state, action: PayloadAction<Resume>) => {
          state.isLoading = false;
          state.resumes.unshift(action.payload);
          state.filteredResumes = applyFilters(state.resumes, state.filters);
          state.error = null;
        }
      )
      .addCase(generateResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to generate resume";
      });
  },
});

// Helper function to apply filters
function applyFilters(
  resumes: Resume[],
  filters: ResumesState["filters"]
): Resume[] {
  return resumes.filter((resume) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        resume.title.toLowerCase().includes(searchLower) ||
        resume.developer.name.toLowerCase().includes(searchLower) ||
        (resume.skills && resume.skills.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Developer filter
    if (filters.developerId && resume.developer.id !== filters.developerId) {
      return false;
    }

    // Skills filter
    if (filters.skills.length > 0) {
      if (!resume.skills) return false;
      const resumeSkills = resume.skills.toLowerCase();
      const hasMatchingSkill = filters.skills.some((filterSkill) =>
        resumeSkills.includes(filterSkill.toLowerCase())
      );
      if (!hasMatchingSkill) return false;
    }

    return true;
  });
}

export const {
  clearError,
  setSearchFilter,
  setDeveloperFilter,
  setSkillsFilter,
  clearFilters,
} = resumesSlice.actions;

export default resumesSlice.reducer;
