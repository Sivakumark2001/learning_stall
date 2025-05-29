import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} Learning Stall
    </footer>
  );
}

export default Footer;