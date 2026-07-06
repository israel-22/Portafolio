import React from "react";

import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
import "./skins.css";

import House from "./components/MrHouseTerminal/MrHouse.jsx";

import ibmLogo from "../../assets/icons/ibm.png";
import atomCurrency from "../../assets/icons/FO76_Atom_Currency_2.webp";
import pistolIcon from "../../assets/icons/FO76_iconwheel_pistol.webp";
import briefcaseIcon from "../../assets/icons/FO76NW_icons_briefcase.webp";
import specialIcon from "../../assets/icons/FO76_vaultboy_endurance.webp";

function Skins() {
  return (
    <div className="home-container">
      <div className="glow"></div>
      <h1>C:\\ Mi Portafolio Retro</h1>

      <div className="icon-grid">
        <IconPipboy src={atomCurrency} alt="Atom Currency" />
        <IconPipboy src={pistolIcon} alt="Pistol Icon" />
        <IconPipboy src={ibmLogo} alt="IBM Logo" />
        <IconPipboy src={briefcaseIcon} alt="Briefcase Icon" />
        <IconPipboy src={specialIcon} alt="Special Icon" />
      </div>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique,
        obcaecati repudiandae esse autem ratione accusamus vero tempora! Neque,
        ipsum. Quidem soluta illo totam doloremque quae perferendis id est
        reprehenderit voluptates!
      </p>
      <House />
    </div>
  );
}

export default Skins;
