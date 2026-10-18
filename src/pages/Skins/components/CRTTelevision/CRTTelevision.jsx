
import { useState } from "react";
import "./crtTelevision.css";
import generalAtomic from "../../../../assets/icons/generalAtomic.png";


// Catálogo inicial.
// Sustituiremos los videoId vacíos por los identificadores
// reales de los videos de YouTube que elijas.
const defaultChannels = [
  {
    id: "ch-01",
    name: "ROBCO CLASSICS",
    videoId: "",
  },
  {
    id: "ch-02",
    name: "PRE-WAR ARCHIVE",
    videoId: "",
  },
  {
    id: "ch-03",
    name: "ATOMIC BROADCAST",
    videoId: "",
  },
];

const pictureProfiles = [
  { id: "noir", name: "ATOMIC NOIR" },
  { id: "green", name: "ROBCO GREEN" },
  { id: "color", name: "ECUACOLOR" },
  { id: "sepia", name: "PRE-WAR ARCHIVE" },
  { id: "blue", name: "IBM BROADCAST" },
  { id: "amber", name: "ATOMIC AMBER" },
];

function CRTTelevision() {
  const [channels] = useState(defaultChannels);
  const [channelIndex, setChannelIndex] = useState(0);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isChangingChannel, setIsChangingChannel] = useState(false);

  const currentChannel = channels[channelIndex];
  const currentProfile = pictureProfiles[pictureIndex];

  const changeChannel = (direction) => {
    if (!channels.length) return;

    setIsChangingChannel(true);

    setChannelIndex((previous) => (
      (previous + direction + channels.length) % channels.length
    ));

    // Breve efecto de estática al sintonizar.
    window.setTimeout(() => {
      setIsChangingChannel(false);
    }, 500);
  };

  const changePictureProfile = () => {
    setPictureIndex((previous) => (
      (previous + 1) % pictureProfiles.length
    ));
  };

  const togglePower = () => {
    setIsPoweredOn((previous) => !previous);
    setIsChangingChannel(false);
  };

  return (
    <section
      className={`tv-console ${isPoweredOn ? "tv-powered" : "tv-off"}`}
    >
      <header className="tv-header">
        <span className="tv-edition">GENERAL ATOMICS · 1954</span>

        <h2>ATOMIC TELEVISION</h2>

        <span className="tv-model">MODEL GA-01</span>
      </header>

      <div className="tv-body">
        <main className="tv-screen-frame">
          <div
            className={[
              "tv-screen",
              `tv-profile-${currentProfile.id}`,
              isPoweredOn ? "tv-screen-active" : "",
              isChangingChannel ? "tv-static" : "",
            ].filter(Boolean).join(" ")}
          >
            {!isPoweredOn ? (
              <div className="tv-screen-message">
                <span className="tv-power-symbol">⏻</span>
                <p>TELEVISION OFF</p>
              </div>
            ) : isChangingChannel ? (
              <div className="tv-screen-message">
                <p>SEARCHING FOR SIGNAL...</p>
                <div className="tv-static-noise" />
              </div>
            ) : currentChannel?.videoId ? (
              <iframe
                key={`${currentChannel.id}-${currentChannel.videoId}`}
                className="tv-youtube-player"
                src={`https://www.youtube-nocookie.com/embed/${currentChannel.videoId}?autoplay=1&rel=0`}
                title={currentChannel.name}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="tv-screen-message">
                <p>NO SIGNAL</p>
                <span>
                  CH {String(channelIndex + 1).padStart(2, "0")}
                  {" · "}
                  {currentChannel?.name}
                </span>
                <small>CHANNEL NOT CONFIGURED</small>
              </div>
            )}

            {isPoweredOn && (
              <>
                <div className="tv-scanlines" />
                <div className="tv-vignette" />
                <div className="tv-grain" />
              </>
            )}
          </div>
        </main>

        <aside className="tv-panel">
          <div className="tv-brand">
            <img src={generalAtomic} className="general-atomic-logo" alt="general atomic" />
        
            <span className="tv-brand-symbol">✦</span>
            <strong>GENERAL ATOMICS</strong>
            <small>TELEVISIONS & RADIO</small>
          </div>

          <div className="tv-channel-display">
            <span>CHANNEL SELECTOR</span>

            <strong>
              CH {String(channelIndex + 1).padStart(2, "0")}
            </strong>

            <p>{currentChannel?.name ?? "NO CHANNEL"}</p>
          </div>

          <div className="tv-knob-group">
            <span>CHANNEL</span>

            <button
              type="button"
              className="tv-knob"
              onClick={() => changeChannel(1)}
              disabled={!isPoweredOn || channels.length < 2}
              aria-label="Girar perilla al siguiente canal"
              title="Siguiente canal"
            >
              <span className="tv-knob-marker" />
            </button>

            <div className="tv-step-controls">
              <button
                type="button"
                onClick={() => changeChannel(-1)}
                disabled={!isPoweredOn || channels.length < 2}
                aria-label="Canal anterior"
              >
                ◀
              </button>

              <button
                type="button"
                onClick={() => changeChannel(1)}
                disabled={!isPoweredOn || channels.length < 2}
                aria-label="Canal siguiente"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="tv-knob-group">
            <span>PICTURE</span>

            <button
              type="button"
              className="tv-knob tv-picture-knob"
              onClick={changePictureProfile}
              disabled={!isPoweredOn}
              aria-label={`Cambiar perfil de imagen. Actual: ${currentProfile.name}`}
              title="Cambiar perfil de imagen"
            >
              <span
                className="tv-knob-marker"
                style={{
                  transform: `translateX(-50%) rotate(${pictureIndex * 60}deg)`,
                }}
              />
            </button>

            <small className="tv-profile-name">
              {currentProfile.name}
            </small>
          </div>

          <button
            type="button"
            className={`tv-power-button ${isPoweredOn ? "active" : ""}`}
            onClick={togglePower}
          >
            <span className="tv-power-led" />
            {isPoweredOn ? "POWER OFF" : "POWER ON"}
          </button>
        </aside>
      </div>

      <footer className="tv-footer">
        <span>GENERAL ATOMICS INTERNATIONAL</span>
        <span>CH {String(channelIndex + 1).padStart(2, "0")} · {currentChannel?.name}</span>
        <span>{isPoweredOn ? "SYSTEM ONLINE" : "SYSTEM OFFLINE"}</span>
      </footer>
    </section>
  );
}

export default CRTTelevision;
