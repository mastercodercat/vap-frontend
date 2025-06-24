// Authentication persistence utilities
export interface AuthData {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  token: string | null;
}

const AUTH_STORAGE_KEY = "vap_auth";

export const saveAuthToStorage = (authData: AuthData): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    console.log("Auth data saved to localStorage:", {
      user: authData.user?.email,
      hasToken: !!authData.token,
    });
  } catch (error) {
    console.error("Failed to save auth to localStorage:", error);
  }
};

export const loadAuthFromStorage = (): AuthData => {
  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    const parsed = authData
      ? JSON.parse(authData)
      : { user: null, token: null };
    console.log("Auth data loaded from localStorage:", {
      user: parsed.user?.email,
      hasToken: !!parsed.token,
    });
    return parsed;
  } catch (error) {
    console.error("Failed to load auth from localStorage:", error);
    return { user: null, token: null };
  }
};

export const clearAuthFromStorage = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    console.log("Auth data cleared from localStorage");
  } catch (error) {
    console.error("Failed to clear auth from localStorage:", error);
  }
};

export const isAuthValid = (authData: AuthData): boolean => {
  return !!(authData.user && authData.token);
};

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Failed to check token expiration:", error);
    return true; // Assume expired if we can't decode
  }
};

// Validate stored authentication data
export const validateStoredAuth = (): AuthData => {
  const authData = loadAuthFromStorage();

  if (!isAuthValid(authData)) {
    console.log("Invalid auth data found, clearing...");
    clearAuthFromStorage();
    return { user: null, token: null };
  }

  // Check if token is expired
  if (authData.token && isTokenExpired(authData.token)) {
    console.log("Token expired, clearing auth data");
    clearAuthFromStorage();
    return { user: null, token: null };
  }

  console.log("Valid auth data found:", {
    user: authData.user?.email,
    hasToken: !!authData.token,
  });
  return authData;
};

// Get auth headers for API requests
export const getAuthHeaders = (): Record<string, string> => {
  const authData = loadAuthFromStorage();
  return authData.token ? { Authorization: `Bearer ${authData.token}` } : {};
};
