import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import WincLogo from "../assets/logo_wincAcademy.jpg";
import "../styles/header.css";

function Header() {
  return (
    <div>
      <div className="break">
        <p className="smallText--left">
          <i>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          </i>
          You are logged in as: José Pluymaekers
        </p>
        <p className="smallText--right">
          <i>
            <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
          </i>
          Log out
        </p>
        <div />
        <header className="header">
          <img id="headerLogoWinc" src={WincLogo} alt="logowinc" />
          <h2>STUDENT DASHBOARD </h2>
        </header>
      </div>
    </div>
  );
}

export default Header;
