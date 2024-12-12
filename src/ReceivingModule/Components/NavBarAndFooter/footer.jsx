// eslint-disable-next-line no-unused-vars
import React from "react";
import "./navbarAndFooter.css";
import logo from "./assets/logo.png";

export const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footerLogo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="footer-bottom">
          JBT building Jose, Romero Rd.,Brgy. Talay, Dumaguete City 6200 Negros
          Oriental, Philippines
        </div>
      </div>
    </>
  );
};

export default Footer;
