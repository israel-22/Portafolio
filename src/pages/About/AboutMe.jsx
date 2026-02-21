import React from "react";

import "./aboutMe.css";
import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";

import S from "../../assets/icons/FO76_S.webp";
import P from "../../assets/icons/FO76_P.webp";
import E from "../../assets/icons/FO76_E.webp";
import C from "../../assets/icons/FO76_C.webp";
import I from "../../assets/icons/FO76_I.webp";
import A from "../../assets/icons/FO76_A.webp";
import L from "../../assets/icons/FO76_L.webp";
import Character from "../../assets/icons/FO76_character.webp";

export default function AboutMe() {
  return (
    <div className="about-container">
      <div className="about-frame">

        {/* HEADER */}
        <header className="about-header">
          <div className="home-text">
             <h1>&gt; ABOUT_ME</h1>
          <IconPipboy src={Character} alt="Character Icon" />
          </div>
          
        </header>

        {/* CONTENT */}
        <section className="about-content">

          {/* SPECIAL BAR */}
          <aside className="special-column">
            {/* aquí luego van los 7 iconos SPECIAL */}
            <IconPipboy src={S} alt="Special Icon S" />
            <IconPipboy src={P} alt="Special Icon P" />
            <IconPipboy src={E} alt="Special Icon E" />
            <IconPipboy src={C} alt="Special Icon C" />
            <IconPipboy src={I} alt="Special Icon I" />
            <IconPipboy src={A} alt="Special Icon A" />
            <IconPipboy src={L} alt="Special Icon L" />
          </aside>

          {/* INFO */}
          <main className="about-info">

            <section className="about-profile">
              <h2>&gt; NAME: Israel Santos</h2>
              <p>&gt; ROLE: Junior Developer</p>
              <p>&gt; TITLE: Software Development Technologist</p>
            </section>

            <section className="about-skills">
              <h3>&gt; SKILLS</h3>
            </section>

            <section className="about-learning">
              <h3>&gt; LEARNING</h3>
            </section>

            <section className="about-projects">
              <h3>&gt; PROJECTS</h3>
            </section>

          </main>
        </section>

        {/* TECH CAROUSELS */}
        <section className="about-tech">
          <div className="tech-dominant"></div>
          <div className="tech-learning"></div>
        </section>

      </div>
    </div>
  );
}
