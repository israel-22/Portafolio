import { useState, useCallback } from "react";
import "./consoleBody.css";
import useKeyboard from "../../hooks/useKeyboard";
import useGameControls from "../../hooks/useGameControls";
import nukaChapa from "../../../../../../assets/icons/nuka-chapa.png";
import nukaHorizontal from "../../../../../../assets/icons/nuka-horizontal.png";
import GameScreen from "../GameScreen/GameScreen";
import DisplaySelector from "../DisplaySelector/DisplaySelector";
import { ARCADE_GAMES } from "../../data/gameCatalog";
import {
  DISPLAY_PROFILES,
  DEFAULT_DISPLAY_PROFILE,
} from "../../data/displayProfiles";

// Convierte la posición horizontal en un valor de 0 a 100.
const updateKnob = (event, setter) => {
  const rect = event.currentTarget.getBoundingClientRect();

  const position = (event.clientX - rect.left) / rect.width;
  const value = Math.round(position * 100);

  setter(Math.max(0, Math.min(100, value)));
};

// Permite controlar las perillas con el teclado.
const handleKnobKeyDown = (event, value, setter) => {
  let nextValue = value;

  switch (event.key) {
    case "ArrowRight":
    case "ArrowUp":
      nextValue = Math.min(100, value + 2);
      break;

    case "ArrowLeft":
    case "ArrowDown":
      nextValue = Math.max(0, value - 2);
      break;

    case "Home":
      nextValue = 0;
      break;

    case "End":
      nextValue = 100;
      break;

    default:
      return;
  }

  event.preventDefault();
  setter(nextValue);
};

export default function ConsoleBody() {
  const [selectedProfile, setSelectedProfile] = useState(
    DEFAULT_DISPLAY_PROFILE,
  );

  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(50);
  const profile = DISPLAY_PROFILES[selectedProfile];

  const displayVariables = {
    "--arcade-phosphor": profile.phosphor,
    "--arcade-phosphor-soft": profile.phosphorSoft,
    "--arcade-crt-core": profile.crtCore,
    "--arcade-crt-mid": profile.crtMid,
    "--arcade-crt-dark": profile.crtDark,
    "--arcade-brightness": brightness / 100,
    "--arcade-volume": volume / 100,
  };

  const [isGameActive, setIsGameActive] = useState(false);

  const { pressControl, releaseControl, releaseAllControls } =
    useGameControls();

  const [selectedGame, setSelectedGame] = useState("doom");

  const moveGameSelection = useCallback(
    (direction) => {
      const currentIndex = ARCADE_GAMES.findIndex(
        (game) => game.id === selectedGame,
      );

      const nextIndex =
        (currentIndex + direction + ARCADE_GAMES.length) % ARCADE_GAMES.length;

      setSelectedGame(ARCADE_GAMES[nextIndex].id);
    },
    [selectedGame],
  );

  const handleStart = useCallback(() => {
    const game = ARCADE_GAMES.find((item) => item.id === selectedGame);

    if (game?.status !== "available") {
      console.info(`${game?.title}: todavía no está integrado.`);
      return;
    }

    setIsGameActive(true);
    console.info(`Iniciando ${game.title}`);
  }, [selectedGame]);

  const handleBack = useCallback(() => {
    if (!isGameActive) return;

    setIsGameActive(false);
    releaseAllControls();

    console.info("Regresando al menú.");
  }, [isGameActive, releaseAllControls]);

  useKeyboard({
    onMoveSelection: moveGameSelection,
    onStart: handleStart,
    onBack: handleBack,
    onControlDown: pressControl,
    onControlUp: releaseControl,
    isGameActive,
  });

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
          <GameScreen
            selectedGame={selectedGame}
            onSelect={setSelectedGame}
            onStart={handleStart}
          />
          <span className="robco-console__screen-label">NUKA DISPLAY</span>
        </div>

        <div className="robco-console__controls">
          <div className="robco-console__dpad">
            <button
              type="button"
              aria-label="Arriba"
              onClick={() => {
                if (!isGameActive) moveGameSelection(-1);
              }}
              onPointerDown={() => {
                if (isGameActive) pressControl("up");
              }}
              onPointerUp={() => releaseControl("up")}
              onPointerLeave={() => releaseControl("up")}
              onPointerCancel={() => releaseControl("up")}
            >
              ▲
            </button>

            <button
              type="button"
              aria-label="Izquierda"
              onPointerDown={() => {
                if (isGameActive) pressControl("left");
              }}
              onPointerUp={() => releaseControl("left")}
              onPointerLeave={() => releaseControl("left")}
              onPointerCancel={() => releaseControl("left")}
            >
              ◀
            </button>

            <button
              type="button"
              aria-label="Derecha"
              onPointerDown={() => {
                if (isGameActive) pressControl("right");
              }}
              onPointerUp={() => releaseControl("right")}
              onPointerLeave={() => releaseControl("right")}
              onPointerCancel={() => releaseControl("right")}
            >
              ▶
            </button>

            <button
              type="button"
              aria-label="Abajo"
              onClick={() => {
                if (!isGameActive) moveGameSelection(1);
              }}
              onPointerDown={() => {
                if (isGameActive) pressControl("down");
              }}
              onPointerUp={() => releaseControl("down")}
              onPointerLeave={() => releaseControl("down")}
              onPointerCancel={() => releaseControl("down")}
            >
              ▼
            </button>

            <span className="robco-console__dpad-center" />
          </div>

          <div className="robco-console__action-buttons">
            <button aria-label="Botón A" onClick={handleStart}>
              A
            </button>
            <button aria-label="Botón W">W</button>
            <button aria-label="Botón S">S</button>
            <button aria-label="Botón D">D</button>
          </div>
        </div>

        <footer className="robco-console__utility">
          <div className="robco-console__system-buttons">
            <button type="button">SELECT</button>
            <button type="button" onClick={handleStart}>
              START
            </button>
          </div>

          <div className="robco-console__knobs">
            <div className="robco-console__knob">
              <span>BRIGHT</span>
              <div
                className="robco-console__dial"
                role="slider"
                aria-label="Brillo de pantalla"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={brightness}
                tabIndex={0}
                style={{
                  "--knob-angle": `${-135 + brightness * 2.7}deg`,
                }}
                onPointerDown={(event) => updateKnob(event, setBrightness)}
                onPointerMove={(event) => {
                  if (event.buttons === 1) {
                    updateKnob(event, setBrightness);
                  }
                }}
                onKeyDown={(event) =>
                  handleKnobKeyDown(event, brightness, setBrightness)
                }
              />
            </div>

            <div className="robco-console__knob">
              <span>VOLUME</span>
              <div
                className="robco-console__dial"
                role="slider"
                aria-label="Volumen"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={volume}
                tabIndex={0}
                style={{
                  "--knob-angle": `${-135 + volume * 2.7}deg`,
                }}
                onPointerDown={(event) => updateKnob(event, setVolume)}
                onPointerMove={(event) => {
                  if (event.buttons === 1) {
                    updateKnob(event, setVolume);
                  }
                }}
                onKeyDown={(event) =>
                  handleKnobKeyDown(event, volume, setVolume)
                }
              />
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
/*
### 🔊 Pendiente: ROBCO SOUND – Iluminación reactiva

**Estado:** Pendiente de implementación.

**Objetivo:** Hacer que la rejilla del altavoz de ROBCO ARCADE se ilumine suavemente al ritmo de la música.

**Requisitos:**
- Reaccionar a la intensidad de los bajos del audio.
- Utilizar el color del fósforo seleccionado en `DisplaySelector`.
- Apagarse cuando no haya reproducción de audio.
- Mantener una iluminación sutil, sin efectos exagerados.
- Reutilizar el analizador de audio de ROBCO RADIO cuando este sea implementado, evitando duplicar lógica.

**Archivos involucrados:**
- `ConsoleBody.jsx`
- `consoleBody.css`
- Componente de reproducción de ROBCO RADIO (pendiente de creación).

**Nota técnica:** La perilla `VOLUME` ya tiene estado (`volume`), pero todavía no está conectada al sistema de reproducción.

**Prioridad:** Implementar después de desarrollar el reproductor de audio.
*/
