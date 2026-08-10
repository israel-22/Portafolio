import "./robcoRadio.css";

function RobcoRadio() {
  return (
    <section className="robco-radio">
      {/* HEADER */}
      <header className="radio-header">
        <span className="radio-brand">ROBCO</span>

        <h2>ROBCO RADIO NETWORK</h2>

        <span className="radio-brand">ROBCO</span>
      </header>

      {/* MAIN DISPLAY */}
      <div className="radio-main">
        <div className="crt-frame">
          <div className="crt-screen">

            <div className="crt-grid" />

            <div className="signal-display">
              <span className="signal-title">
                AUDIO SIGNAL
              </span>

              <div className="waveform">
                <span />
                <span />
                <span />
              </div>

              <div className="signal-info">
                <div>
                  <strong>98.7</strong> MHz
                </div>

                <div className="signal-meter">
                  SIGNAL

                  <div className="meter">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i className="inactive" />
                    <i className="inactive" />
                  </div>
                </div>
              </div>

              <div className="station-name">
                ROBCO CLASSICS
                <p>nesesitamos codigo para darle funcionabilidad, enlazar al api y probar sonido y ver como cambiaria de colores crt y colocar el sello rombo que usamos en PDA "RobCo_MDBP.webp"</p>
              </div>
            </div>

            <div className="crt-noise" />
            <div className="crt-scanlines" />

          </div>
        </div>

        {/* RIGHT CONTROL PANEL */}
        <aside className="radio-side">

          <section className="radio-control tuning-control">
            <h3>TUNING</h3>

            <div className="tuning-dial">
              <div className="dial-marker" />
              <div className="dial-center" />
            </div>

            <div className="frequency-scale">
              <span>88</span>
              <span>92</span>
              <span>96</span>
              <span>102</span>
              <span>106</span>
              <span>108</span>
            </div>
          </section>

          <div className="frequency-display">
            <strong>98.7</strong>
            <span>MHz</span>
          </div>

          <section className="station-display">
            <h3>STATION</h3>

            <div className="station-screen">
              ROBCO CLASSICS
            </div>
          </section>

        </aside>
      </div>

      {/* LOWER CONTROLS */}
      <div className="radio-controls">

        {/* VOLUME */}
        <section className="knob-section">
          <h3>VOLUME</h3>

          <div className="knob">
            <div className="knob-marker" />
          </div>

          <div className="knob-labels">
            <span>MIN</span>
            <span>MAX</span>
          </div>
        </section>

        {/* PLAYER */}
        <section className="player-controls">

          <button type="button" aria-label="Previous track">
            ◀◀
          </button>

          <button
            type="button"
            className="play-button"
            aria-label="Play"
          >
            <span className="status-light" />
            PLAY
          </button>

          <button type="button" aria-label="Next track">
            ▶▶
          </button>

        </section>

        {/* TUNING */}
        <section className="knob-section">
          <h3>TUNING</h3>

          <div className="knob">
            <div className="knob-marker" />
          </div>

          <div className="knob-labels">
            <span>−</span>
            <span>+</span>
          </div>
        </section>

        {/* SPEAKER */}
        <section className="speaker">
          <div className="speaker-lines">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="speaker-logo">
            ROBCO
          </div>
        </section>

      </div>

      {/* FOOTER STATUS */}
      <footer className="radio-footer">
        <span>PHOSPHOR: GREEN</span>

        <span className="radio-status">
          STATUS: ONLINE
          <i />
        </span>
      </footer>

    </section>
  );
}

export default RobcoRadio;