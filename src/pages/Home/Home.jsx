import React from "react";
import { NavLink } from "react-router-dom";
import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
import "./home.css";
import fondoII from "../../assets/icons/fondoII.jpg";
import signalIcon from "../../assets/icons/FO4_Vault-Tec_logo.webp";

function Home() {
  return (
    <div className="home-container">
      <div className="home-split">
        {/* TEXTO */}
        <div className="home-text">
          <h1>C:\\ SANTOS-ISRAEL</h1>

             {/* ICONOS (aquí SÍ va IconPipboy) */}
          <div className="icon-grid">
            <IconPipboy src={signalIcon} alt="Signal Icon" />
            {/* otros iconos aquí */}
          </div>
                 
          <p >
            
            &gt; PORTFOLIO v1.0
            <br />
            &gt; TITLE: SOFTWARE DEVELOPMENT TECHNOLOGIST
            <br />
            &gt; POSITION: JUNIOR DEVELOPER
          </p>
          <NavLink to="/about" className="nav-item home-btn">
            &gt; [F2] ABOUT-ME
          </NavLink>
        </div>

        {/* IMAGEN CRT GRANDE */}
        <div className="home-image">
          <img src={fondoII} alt="CRT Projection" />
        </div>
      </div>
    </div>
  );
}

export default Home;
