
import "./consoleBody.css";

export default function ConsoleBody() {
  return (
    <section className="robco-console">

      <header className="robco-console__header">
        <span className="robco-console__brand">ROBCO</span>
        <span className="robco-console__model">
          NUKA-COLA SPACE COMMAND
        </span>
        <span className="robco-console__serial">RC-2077</span>
      </header>

      <main className="robco-console__layout">

        <div className="robco-console__screen-frame">
          <div className="robco-console__screen">
            <div className="robco-console__screen-content">
              <span className="robco-console__screen-brand">
                ROBCO INDUSTRIES
              </span>
              <span className="robco-console__screen-title">
                ARCADE SYSTEM
              </span>
              <span className="robco-console__screen-status">
                SYSTEM READY_
              </span>
            </div>
          </div>
          <span className="robco-console__screen-label">
            NUKA DISPLAY
          </span>
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
            <button aria-label="Botón B">B</button>
            <button aria-label="Botón C">C</button>
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

            <div className="robco-console__knob">
              <span>COLOR</span>
              <div className="robco-console__dial" />
            </div>
          </div>

        </footer>

      </main>

      <div className="robco-console__bottom">
        PROPERTY OF ROBCO INDUSTRIES
      </div>

    </section>
  );
}
