import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useTypedSelector, useAppDispatch } from "./store/hooks";
import { restoreAuth } from "./store/slices/authSlice";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import { DevelopersPage } from "./pages/DevelopersPage";
import type { RootState } from "./store";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useTypedSelector(
    (state: RootState) => state.auth
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Restore authentication state on app initialization
  useEffect(() => {
    dispatch(restoreAuth());
    setIsInitialized(true);
  }, [dispatch]);

  // Show loading spinner while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/developers"
          element={
            isAuthenticated ? <DevelopersPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/resume"
          element={
            isAuthenticated ? (
              <div className="p-6">
                <h1>Resume Generation - Coming Soon</h1>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/projects"
          element={
            isAuthenticated ? (
              <div className="p-6">
                <h1>Projects - Coming Soon</h1>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/analytics"
          element={
            isAuthenticated ? (
              <div className="p-6">
                <h1>Analytics - Coming Soon</h1>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <div className="p-6">
                <h1>Settings - Coming Soon</h1>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
