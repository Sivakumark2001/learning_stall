import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import StudentGridPage from "./Pages/StudentGridPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./route/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { useAuth } from "./context/AuthContext";

function AppLayout({ children }) {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className="app-layout">
      {!hideHeader && <Header />}
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StudentGridPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login onLogin={() => {}} />}
          />
          <Route
            path="/register"
            element={currentUser ? <Navigate to="/" /> : <Register onRegister={() => {}} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;