import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaThList, FaFolderOpen, FaTable } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import "../css/leftNav.css";

const navLinks = [
  { label: "Home", path: "/", icon: <FaThList /> },
  {
    label: "Problems",
    icon: <FaFolderOpen />,
    children: [
      { label: "Problem 1: File Manager", path: "/problem/1" },
      { label: "Problem 2: Pagination", path: "/problem/2" },
    ],
  },
  { label: "Data Grid", path: "/datagrid", icon: <FaTable /> },
];

const LeftNav = ({ headerHeight = 72 }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Hamburger Icon - now relative, not fixed */}
      <motion.button
        className="hamburger-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open navigation"
        animate={open ? { rotate: 90 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          marginRight: 18,
          background: "none",
          border: "none",
          outline: "none",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          zIndex: 1201,
          position: "relative",
        }}
      >
        <motion.span
          initial={false}
          animate={open ? { rotate: 180 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {open ? (
            <IoMdClose size={30} color="var(--accent-main)" />
          ) : (
            <HiMenuAlt3 size={30} color="var(--accent-main)" />
          )}
        </motion.span>
      </motion.button>

      {/* Animated Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="leftnav-drawer"
            initial={{ x: -260, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -260, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{
              top: headerHeight,
              height: `calc(100vh - ${headerHeight}px)`,
            }}
          >
            <ul>
              {navLinks.map((item, idx) =>
                item.children ? (
                  <li key={idx} className="leftnav-group">
                    <span className="leftnav-group-title">
                      {item.icon}
                      {item.label}
                    </span>
                    <ul>
                      {item.children.map((child, cidx) => (
                        <li key={cidx}>
                          <Link
                            to={child.path}
                            className={
                              location.pathname === child.path
                                ? "leftnav-link active"
                                : "leftnav-link"
                            }
                            onClick={() => setOpen(false)}
                          >
                            <span className="leftnav-link-label">{child.label}</span>
                            {location.pathname === child.path && (
                              <motion.div
                                className="leftnav-underline"
                                layoutId="leftnav-underline"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className={
                        location.pathname === item.path
                          ? "leftnav-link active"
                          : "leftnav-link"
                      }
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      <span className="leftnav-link-label">{item.label}</span>
                      {location.pathname === item.path && (
                        <motion.div
                          className="leftnav-underline"
                          layoutId="leftnav-underline"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeftNav;