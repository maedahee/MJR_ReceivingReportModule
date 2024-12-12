// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from '/src/assets/logo.png';
import "./navbarAndFooter.css";
import hamburger from "/src/assets/hamburger.png";

export const Navbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <>
      <header>
        <div>
          <ul>
            <li>
              <img
                onClick={toggleSidebar}
                className="hamburger"
                src={hamburger}
                alt="hamburger"
              />
            </li>
            <li>
              <a href="#">
                <img className="logo" src={logo} alt="Logo" />
              </a>
            </li>
            <li>
              <a href="#" className="shopName">
                Galanter and Jones
              </a>
            </li>
          </ul>
        </div>
      </header>
      {isSidebarVisible && <Sidebar />}
    </>
  );
};

export default Navbar;

export const Sidebar = () => {
  return (
    <div className="sidebar-container" id="sidebar">
      <a href="#">
        <div className="sidebar-item">sidebar-item</div>
      </a>
      <a href="#">
        <div className="sidebar-item">sidebar-item</div>
      </a>
      <a href="#">
        <div className="sidebar-item">sidebar-item</div>
      </a>
    </div>
  );
};
