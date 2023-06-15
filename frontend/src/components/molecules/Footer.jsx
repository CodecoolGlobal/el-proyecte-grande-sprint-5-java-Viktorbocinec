import React from "react";
import '../../General.css'
import AboutPopUp from "./AboutPopUp";

const Footer = () => {
  return (
    <footer className="footer">
      <AboutPopUp />
      <p>FAQ</p>
      <p>Impressum</p>
    </footer>
  );
};

export default Footer;