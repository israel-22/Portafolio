
import "./arcadeMenu.css";
import { ARCADE_GAMES } from "../../data/gameCatalog";

export default function ArcadeMenu({
  selectedGame,
  onSelect,
  onStart,
}) {
  const currentIndex = ARCADE_GAMES.findIndex(
    (game) => game.id === selectedGame,
  );

  const currentGame = ARCADE_GAMES[currentIndex];

  const moveSelection = (direction) => {
    const nextIndex =
      (currentIndex + direction + ARCADE_GAMES.length) %
      ARCADE_GAMES.length;

    onSelect(ARCADE_GAMES[nextIndex].id);
  };

  return (
    <div className="robco-menu">
      <div className="robco-menu__header">
        <span>ROBCO INDUSTRIES</span>
        <span>ARCADE SYSTEM</span>
      </div>

      <div className="robco-menu__content">
        <p className="robco-menu__heading">
          SELECT YOUR GAME
        </p>

        <ul className="robco-menu__list">
          {ARCADE_GAMES.map((game, index) => (
            <li key={game.id}>
              <button
                type="button"
                className={
                  game.id === selectedGame
                    ? "robco-menu__item robco-menu__item--active"
                    : "robco-menu__item"
                }
                onClick={() => onSelect(game.id)}
                onDoubleClick={onStart}
              >
                <span>
                  {game.id === selectedGame ? ">" : " "}
                </span>
                {game.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="robco-menu__details">
          <span>{currentGame?.description}</span>
          <span>STATUS: {currentGame?.status.toUpperCase()}</span>
        </div>
      </div>

      <div className="robco-menu__footer">
        <span>UP / DOWN : SELECT</span>
        <span>START : PLAY</span>
      </div>
    </div>
  );
}

