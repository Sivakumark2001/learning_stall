import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import "../App.css";

function Header() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="header">
      <Link to="/" className="header-title">
        Learning Stall 😎
      </Link>
      {user && (
        <button
          onClick={handleLogout}
          className="header-logout-btn"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;