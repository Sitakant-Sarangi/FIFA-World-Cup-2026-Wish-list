const games = [
  {
    id: 1,
    teams: "Canada vs Mexico",
    venue: "Toronto Stadium, Toronto",
    date: "June 11, 2026",
    stage: "Opening Match"
  },
  {
    id: 2,
    teams: "USA vs Japan",
    venue: "SoFi Stadium, Los Angeles",
    date: "June 14, 2026",
    stage: "Group Stage"
  },
  {
    id: 3,
    teams: "Brazil vs France",
    venue: "AT&T Stadium, Dallas",
    date: "June 20, 2026",
    stage: "Group Stage"
  },
  {
    id: 4,
    teams: "",
    venue: "MetLife Stadium, New York",
    date: "July 3, 2026",
    stage: "Quarter-final"
  },
  {
    id: 5,
    teams: "",
    venue: "Mercedes-Benz Stadium, Atlanta",
    date: "July 8, 2026",
    stage: "Semi-final"
  },
  {
    id: 6,
    teams: "Final Match",
    venue: "MetLife Stadium, New York",
    date: "July 19, 2026",
    stage: "Final"
  }
];

const storageKey = "fifa2026-favourites";
const gamesGrid = document.getElementById("games-grid");
const favouritesList = document.getElementById("favourites-list");
const favouritesCount = document.getElementById("favourites-count");
const clearButton = document.getElementById("clear-favourites");

function getFavourites() {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : [];
}

function saveFavourites(favourites) {
  localStorage.setItem(storageKey, JSON.stringify(favourites));
}

function isSaved(gameId) {
  return getFavourites().some((game) => game.id === gameId);
}

function toggleFavourite(gameId) {
  const selectedGame = games.find((game) => game.id === gameId);
  const favourites = getFavourites();
  const exists = favourites.some((game) => game.id === gameId);

  const updatedFavourites = exists
    ? favourites.filter((game) => game.id !== gameId)
    : [...favourites, selectedGame];

  saveFavourites(updatedFavourites);
  renderGames();
  renderFavourites();
}

function removeFavourite(gameId) {
  const updatedFavourites = getFavourites().filter((game) => game.id !== gameId);
  saveFavourites(updatedFavourites);
  renderGames();
  renderFavourites();
}

function renderGames() {
  gamesGrid.innerHTML = games
    .map(
      (game) => `
        <article class="game-card">
          <img class="game-card-image" src="images/ImageCreator_20260331112023.jpg" alt="${game.teams || game.stage} stadium view" />
          <span class="stage-pill">${game.stage}</span>
          <h3>${game.teams || game.stage}</h3>
          <ul class="game-meta">
            <li>📍 ${game.venue}</li>
            <li>📅 ${game.date}</li>
          </ul>
          <div class="card-footer">
            <span>${isSaved(game.id) ? "In your favourites" : "Add to your wishlist"}</span>
            <button class="action-btn ${isSaved(game.id) ? "saved" : ""}" onclick="toggleFavourite(${game.id})">
              ${isSaved(game.id) ? "Remove" : "Add to favourites"}
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderFavourites() {
  const favourites = getFavourites();
  favouritesCount.textContent = `${favourites.length} saved`;

  if (!favourites.length) {
    favouritesList.innerHTML = `
      <div class="empty-state">
        <h3>No favourite games yet</h3>
        <p>Choose a match above and it will appear here instantly.</p>
      </div>
    `;
    return;
  }

  favouritesList.innerHTML = favourites
    .map(
      (game) => `
        <article class="favourite-card">
          <span class="stage-pill">${game.stage}</span>
          <h3>${game.teams}</h3>
          <ul class="game-meta">
            <li> ${game.venue}</li>
            <li> ${game.date}</li>
          </ul>
          <button class="remove-btn" onclick="removeFavourite(${game.id})">Remove from favourites</button>
        </article>
      `
    )
    .join("");
}

clearButton.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  renderGames();
  renderFavourites();
});

renderGames();
renderFavourites();
