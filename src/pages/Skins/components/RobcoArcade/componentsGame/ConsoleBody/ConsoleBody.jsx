import { useState } from "react";
import "./consoleBody.css";
import nukaChapa from "../../../../../../assets/icons/nuka-chapa.png";
import nukaHorizontal from "../../../../../../assets/icons/nuka-horizontal.png";
import GameScreen from "../GameScreen/GameScreen";
import DisplaySelector from "../DisplaySelector/DisplaySelector";
import {
  DISPLAY_PROFILES,
  DEFAULT_DISPLAY_PROFILE,
} from "../../data/displayProfiles";

export default function ConsoleBody() {
  const [selectedProfile, setSelectedProfile] = useState(
    DEFAULT_DISPLAY_PROFILE,
  );

  const profile = DISPLAY_PROFILES[selectedProfile];

  const displayVariables = {
    "--arcade-phosphor": profile.phosphor,
    "--arcade-phosphor-soft": profile.phosphorSoft,
    "--arcade-crt-core": profile.crtCore,
    "--arcade-crt-mid": profile.crtMid,
    "--arcade-crt-dark": profile.crtDark,
  };
  return (
    <section
      className="robco-console robco-console--wasteland"
      style={displayVariables}
    >
      {/* Antena espacial ornamental */}
      <div className="robco-console__antenna" aria-hidden="true">
        <span className="robco-console__antenna-base" />
        <span className="robco-console__insulator" />
        <span className="robco-console__insulator" />
        <span className="robco-console__antenna-tip" />
      </div>

      {/* Aletas laterales estilo cohete */}
      <div
        className="robco-console__fin robco-console__fin--left"
        aria-hidden="true"
      />
      <div
        className="robco-console__fin robco-console__fin--right"
        aria-hidden="true"
      />

      <header className="robco-console__header">
        <span className="robco-console__brand">ROBCO</span>
        <img
          className="robco-console__logo"
          src={nukaHorizontal}
          alt="Nuka-Cola"
        />
        <span className="robco-console__serial">RC-2077</span>
      </header>

      <main className="robco-console__layout">
        <div className="robco-console__screen-frame">
          <GameScreen />
          <span className="robco-console__screen-label">NUKA DISPLAY</span>
        </div>

        <div className="robco-console__controls">
          <div className="robco-console__dpad">
            <button aria-label="Arriba">▲</button>
            <button aria-label="Izquierda">◀</button>
            <button aria-label="Derecha">▶</button>
            <button aria-label="Abajo">▼</button>
            <span className="robco-console__dpad-center" />
          </div>

          <div className="robco-console__action-buttons">
            <button aria-label="Botón A">A</button>
            <button aria-label="Botón W">W</button>
            <button aria-label="Botón S">S</button>
            <button aria-label="Botón D">D</button>
          </div>
        </div>

        <footer className="robco-console__utility">
          <div className="robco-console__system-buttons">
            <button type="button">SELECT</button>
            <button type="button">START</button>
          </div>

          <div className="robco-console__knobs">
            <div className="robco-console__knob">
              <span>BRIGHT</span>
              <div className="robco-console__dial" />
            </div>

            <div className="robco-console__knob">
              <span>VOLUME</span>
              <div className="robco-console__dial" />
            </div>

            <DisplaySelector
              selectedProfile={selectedProfile}
              onChange={setSelectedProfile}
            />
          </div>
        </footer>
      </main>
      <br></br>

      <footer className="robco-console__utility">
        <div className="robco-console__power">
          <span className="robco-console__power-label">ATOMIC POWER</span>
          <span className="robco-console__power-light" />
          <span className="robco-console__power-status">ONLINE</span>
        </div>
        <img
          className="robco-console__badge"
          src={nukaChapa}
          alt="Insignia Nuka-Cola"
        />

        <div className="robco-console__speaker">
          <span className="robco-console__speaker-label">ROBCO SOUND</span>

          <div className="robco-console__speaker-grille">
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>
      </footer>

      <div className="robco-console__bottom">PROPERTY OF ROBCO INDUSTRIES</div>
    </section>
  );
}
