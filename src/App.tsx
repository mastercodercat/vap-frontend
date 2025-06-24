import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useTypedSelector } from "./store/hooks";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import type { RootState } from "./store";

function App() {
  const { isAuthenticated } = useTypedSelector(
    (state: RootState) => state.auth
  );

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
