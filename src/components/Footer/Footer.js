import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <h5>E-Commerce Platform Project</h5>
      <b>&copy; {year} Fahmid Shabab Khorsheed </b>
      <p>
        Powered by{" "}
        <a
          target="_blank"
          style={{ fontWeight: "bolder" }}
          href="https://commercejs.com"
        >
          Commerce.js
        </a>
      </p>
    </div>
  );
};

export default Footer;
