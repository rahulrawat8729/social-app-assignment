import React, { useContext } from 'react'; // <-- Ensure useContext is imported
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SocialFeedPage from './pages/SocialFeedPage';
import { AuthContext } from './context/AuthContext'; // <-- Ensure AuthContext is imported
// import ProtectedRoute from './components/ProtectedRoute'; // <-- DELETE or COMMENT OUT this line

function App() {
  const { user } = useContext(AuthContext); // Get user state from context

  return (
    <BrowserRouter>
      <Routes>

        {/* Route for /login: If already logged in, redirect to feed. */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />

        {/* Route for /register: If already logged in, redirect to feed. */}
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <RegisterPage />}
        />

        {/* Home Route /: If NOT logged in, redirect to login page. */}
        <Route
          path="/"
          element={user ? <SocialFeedPage /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all: Redirect unrecognized paths to the home route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;