import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import CircularLoader from "./components/CircularLoader";

// Lazy load the MusicLibrary component from the remote microfrontend
const MusicLibrary = React.lazy(() => import("musicLibrary/App")); 

// AppContent component to access auth context
const AppContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isAuthenticated } = useAuth();


  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Only show Header when authenticated */}
      {isAuthenticated && <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
      
      <main className={`${isAuthenticated ? 'pt-16 md:pl-[60px]' : ''} min-h-screen`}>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
          } />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Suspense fallback={
                 <CircularLoader/>
                }>
                  <MusicLibrary />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Suspense fallback={
                 <CircularLoader/>
                }>
                  <MusicLibrary />
                </Suspense>
              </ProtectedRoute>
            }
          />
          {/* Redirect all other routes to login if not authenticated, otherwise to home */}
          <Route path="*" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </Router>
  );
};

export default App;
