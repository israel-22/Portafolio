import { useState, useEffect, useRef } from "react";
import "./crtTelevision.css";
import generalAtomic from "../../../../assets/icons/generalAtomic.png";
import defaultChannels from "./dataTV/defaultChannels.js";

const pictureProfiles = [
  { id: "noir", name: "ATOMIC NOIR" },
  { id: "green", name: "ROBCO GREEN" },
  { id: "color", name: "ECUACOLOR" },
  { id: "sepia", name: "PRE-WAR ARCHIVE" },
  { id: "blue", name: "IBM BROADCAST" },
  { id: "amber", name: "ATOMIC AMBER" },
];

const YOUTUBE_API_URL = "https://www.youtube.com/iframe_api";
let youtubeApiPromise;

function loadYouTubeAPI() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT);
    };

    let script = document.querySelector(`script[src="${YOUTUBE_API_URL}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = YOUTUBE_API_URL;
      script.async = true;
      document.head.appendChild(script);
    }

    script.addEventListener(
      "error",
      () => {
        youtubeApiPromise = null;
        reject(new Error("No se pudo cargar la API de YouTube."));
      },
      { once: true },
    );
  });

  return youtubeApiPromise;
}

function extractVideoId(value) {
  if (!value) return null;

  try {
    const url = new URL(value);

    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1) || null;
    }

    if (url.searchParams.has("v")) {
      return url.searchParams.get("v");
    }

    const match = url.pathname.match(/\/(?:embed|shorts)\/([^/]+)/);
    return match?.[1] ?? null;
  } catch {
    // También admite IDs puros de YouTube.
    return /^[\w-]{11}$/.test(value) ? value : null;
  }
}

function CRTTelevision() {
  const [channels] = useState(defaultChannels);
  const [channelIndex, setChannelIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isChangingChannel, setIsChangingChannel] = useState(false);
  const [volume, setVolume] = useState(50);
  const [playerReady, setPlayerReady] = useState(false);

  const playerHostRef = useRef(null);
  const playerRef = useRef(null);
  const channelTimeoutRef = useRef(null);
  const loadedVideoIdRef = useRef(null);
  const videosLengthRef = useRef(0);
  const currentVideoIdRef = useRef(null);
  const volumeRef = useRef(volume);

  const currentChannel = channels[channelIndex];
  const currentProfile = pictureProfiles[pictureIndex];

  const videos = currentChannel?.videos ?? [];
  const currentVideoId = extractVideoId(videos[videoIndex]);

  useEffect(() => {
    videosLengthRef.current = videos.length;
    currentVideoIdRef.current = currentVideoId;
    volumeRef.current = volume;
  }, [videos.length, currentVideoId, volume]);

  const changeChannel = (direction) => {
    if (!channels.length) return;

    setIsChangingChannel(true);
    setPlayerReady(false);
    setVideoIndex(0);

    setChannelIndex(
      (previous) => (previous + direction + channels.length) % channels.length,
    );

    window.clearTimeout(channelTimeoutRef.current);

    channelTimeoutRef.current = window.setTimeout(() => {
      setIsChangingChannel(false);
    }, 500);
  };

  const changeVideo = (direction) => {
    if (!videos.length) return;

    setVideoIndex(
      (previous) => (previous + direction + videos.length) % videos.length,
    );
  };

  const changePictureProfile = () => {
    setPictureIndex((previous) => (previous + 1) % pictureProfiles.length);
  };

  const togglePower = () => {
    setIsPoweredOn((previous) => !previous);
    setIsChangingChannel(false);
    setPlayerReady(false);
    window.clearTimeout(channelTimeoutRef.current);
  };

  // Crea y administra el reproductor oficial de YouTube.
  useEffect(() => {
    let cancelled = false;
    let playerInstance = null;

    const wrapper = playerHostRef.current;

    if (!isPoweredOn || isChangingChannel || !currentVideoId || !wrapper) {
      return undefined;
    }

    // YouTube recibe un nodo propio, no uno que React deba controlar.
    const playerTarget = document.createElement("div");
    playerTarget.style.width = "100%";
    playerTarget.style.height = "100%";
    wrapper.replaceChildren(playerTarget);

    loadYouTubeAPI()
      .then((YT) => {
        if (cancelled || !wrapper.isConnected) return;

        playerInstance = new YT.Player(playerTarget, {
          width: "100%",
          height: "100%",
          videoId: currentVideoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return;

              playerRef.current = event.target;
              event.target.setVolume(volumeRef.current);
              loadedVideoIdRef.current = currentVideoIdRef.current;
              setPlayerReady(true);
            },

            onStateChange: (event) => {
              if (
                event.data === YT.PlayerState.ENDED &&
                !cancelled &&
                videosLengthRef.current > 0
              ) {
                setVideoIndex(
                  (previous) => (previous + 1) % videosLengthRef.current,
                );
              }
            },

            onError: () => {
              if (!cancelled) setPlayerReady(false);
            },
          },
        });
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Error al iniciar YouTube:", error);
        }
      });

    return () => {
      cancelled = true;

      if (playerRef.current === playerInstance) {
        playerRef.current = null;
      }

      if (playerInstance) {
        try {
          playerInstance.destroy();
        } catch {
          // El reproductor puede haberse destruido previamente.
        }
      }

      // Limpiamos solo el contenido interno del contenedor.
      wrapper.replaceChildren();
    };
  }, [isPoweredOn, isChangingChannel, channelIndex]);

  // Cambia el vídeo sin destruir el reproductor.
  useEffect(() => {
    const player = playerRef.current;

    if (!playerReady || !player || !currentVideoId) {
      return;
    }

    if (loadedVideoIdRef.current === currentVideoId) {
      return;
    }

    loadedVideoIdRef.current = currentVideoId;
    player.loadVideoById(currentVideoId);
  }, [videoIndex, currentVideoId, playerReady]);

  // Actualiza el volumen sin reconstruir el reproductor.
  useEffect(() => {
    if (playerRef.current && playerReady) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, playerReady]);

  useEffect(() => {
    return () => {
      window.clearTimeout(channelTimeoutRef.current);
    };
  }, []);

  return (
    <section className={`tv-console ${isPoweredOn ? "tv-powered" : "tv-off"}`}>
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
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {!isPoweredOn ? (
              <div className="tv-screen-message">
                <span className="tv-power-symbol">⏻</span>
                <p>TELEVISION OFF</p>
              </div>
            ) : (
              <>
                {isChangingChannel && (
                  <div className="tv-screen-message">
                    <p>SEARCHING FOR SIGNAL...</p>
                    <div className="tv-static-noise" />
                  </div>
                )}

                {!isChangingChannel && !currentVideoId && (
                  <div className="tv-screen-message">
                    <p>NO SIGNAL</p>
                    <span>
                      CH {String(channelIndex + 1).padStart(2, "0")}
                      {" · "}
                      {currentChannel?.name}
                    </span>
                    <small>
                      {videos.length
                        ? "INVALID VIDEO URL"
                        : "CHANNEL NOT CONFIGURED"}
                    </small>
                  </div>
                )}

                <div
                  className="tv-youtube-player"
                  ref={playerHostRef}
                  style={{
                    display:
                      isChangingChannel || !currentVideoId ? "none" : "block",
                  }}
                />
              </>
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
            <img
              src={generalAtomic}
              className="general-atomic-logo"
              alt="General Atomics"
            />
            <span className="tv-brand-symbol">✦</span>
            <strong>GENERAL ATOMICS</strong>
            <small>TELEVISIONS & RADIO</small>
          </div>

          <div className="tv-channel-display">
            <span>CHANNEL SELECTOR</span>
            <strong>CH {String(channelIndex + 1).padStart(2, "0")}</strong>
            <p>{currentChannel?.name ?? "NO CHANNEL"}</p>
            <small>
              {videos.length
                ? `VIDEO ${videoIndex + 1} / ${videos.length}`
                : "NO PROGRAMMING"}
            </small>
          </div>

          <div className="tv-knob-group">
            <span>CHANNEL</span>

            <button
              type="button"
              className="tv-knob"
              style={{ transform: `rotate(${channelIndex * 30}deg)` }}
              onClick={() => changeChannel(1)}
              disabled={!isPoweredOn || channels.length < 2}
              aria-label="Siguiente canal"
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
            <span>VIDEO SELECTOR</span>

            <div className="tv-step-controls">
              <button
                type="button"
                onClick={() => changeVideo(-1)}
                disabled={!isPoweredOn || videos.length < 2}
                aria-label="Vídeo anterior"
                title="Vídeo anterior"
              >
                ◀
              </button>

              <button
                type="button"
                onClick={() => changeVideo(1)}
                disabled={!isPoweredOn || videos.length < 2}
                aria-label="Siguiente vídeo"
                title="Siguiente vídeo"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="tv-volume-control">
            <label htmlFor="tv-volume">VOLUME · {volume}%</label>
            <input
              id="tv-volume"
              type="range"
              min="0"
              max="100"
              step="5"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              disabled={!isPoweredOn}
              aria-label="Volumen del televisor"
            />
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

            <small className="tv-profile-name">{currentProfile.name}</small>
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
        <span>
          CH {String(channelIndex + 1).padStart(2, "0")}
          {" · "}
          {currentChannel?.name}
        </span>
        <span>{isPoweredOn ? "SYSTEM ONLINE" : "SYSTEM OFFLINE"}</span>
      </footer>
    </section>
  );
}

export default CRTTelevision;
