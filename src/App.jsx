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
import HomePage from "./Pages/HomePage";
import FileExplorer from "./problems/problem1/FileExplorer";
import Product from "./problems/problem2/components/Product";
import LayoutBuilder from "./problems/problem3/LayoutBuilder";
import Problem4 from "./problems/problem4/index.jsx";
import ParticleBackground from "./components/ParticleBackground";


function AppLayout({ children }) {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className="app-layout">
      <ParticleBackground />
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
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/1"
            element={
              <ProtectedRoute>
                <FileExplorer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/2"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/3"
            element={
              <ProtectedRoute>
                <LayoutBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/4"
            element={
              <ProtectedRoute>
                <Problem4 />
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
          <Route
            path="/datagrid"
            element={
              <ProtectedRoute>
                <StudentGridPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;