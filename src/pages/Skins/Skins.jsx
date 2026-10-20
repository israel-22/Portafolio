import React from "react";

import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
import "./skins.css";

import House from "./components/MrHouseTerminal/MrHouse.jsx";
import RobcoRadio from "./components/RobcoRadio/RobcoRadio";

import IBM from "../../assets/boot/ibm.png";
import atomCurrency from "../../assets/icons/FO76_Atom_Currency_2.webp";
import pistolIcon from "../../assets/icons/FO76_iconwheel_pistol.webp";
import briefcaseIcon from "../../assets/icons/FO76NW_icons_briefcase.webp";
import specialIcon from "../../assets/icons/FO76_vaultboy_endurance.webp";
import CRTTelevision from "./components/CRTTelevision/CRTTelevision.jsx";

function Skins() {
  return (
  <div className="skins-container">
    <div className="skins-glow" aria-hidden="true"></div>

    <header className="skins-header">
      <p className="skins-overline"> <span>&gt; ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM</span></p>
      <h1 className="skins-title">C:\\ ADDITIONAL_SKILLS</h1>
      <p className="skins-subtitle">
        
        <span>&gt; PERSONAL INTERFACE SYSTEM // SELECT A MODULE</span>
      </p>
    </header>

    <nav className="skins-icon-grid" aria-label="Iconos del sistema">
      <IconPipboy src={atomCurrency} alt="Atom Currency" />
      <IconPipboy src={pistolIcon} alt="Pistol Icon" />
      <IconPipboy src={IBM} alt="IBM Logo" />
      <IconPipboy src={briefcaseIcon} alt="Briefcase Icon" />
      <IconPipboy src={specialIcon} alt="Special Icon" />
    </nav>
      <main className="skins-modules">
      <section className="skins-module skins-house">
        <House />
      </section>

      <section className="skins-module skins-radio">
        <RobcoRadio />
      </section>

     {/* <section className="skins-module skins-television">
        <CRTTelevision />
      </section>*/}
    </main>

    <footer className="skins-footer">
      <span>ROBCO SYSTEMS</span>
      <span>STATUS: OPERATIONAL</span>
      <span>© RETRO PORTFOLIO</span>
    </footer>
  </div>
);
}

export default Skins;
