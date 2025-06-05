import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiAcademicCap  } from "react-icons/hi2";
import "../App.css";

const logoVariants = {
  initial: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, 15, -15, 0],
    scale: [1, 1.1, 1.1, 1],
    transition: { duration: 1.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }
  }
};

function Header() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="header professional-header">
      <Link to="/" className="header-title professional-title">
        <motion.span
          className="logo"
          variants={logoVariants}
          initial="initial"
          animate="animate"
        >
          <HiAcademicCap  size={28} style={{ marginRight: 10, color: "#1976d2" }} />
        </motion.span>
        <span>Learning Stall</span>
      </Link>
      {user && (
        <button
          onClick={handleLogout}
          className="header-logout-btn professional-logout"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;