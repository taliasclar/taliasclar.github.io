const API_KEY = "ec83e3ee"; // OMDb API key
const searchInput = document.querySelector("#search");
const resultsDiv = document.querySelector("#results");
const favoritesDiv = document.querySelector("#favorites");

// --- Search movies ---
async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) {
    resultsDiv.innerHTML = "Please enter a movie title.";
    return;
  }

  resultsDiv.innerHTML = "Searching...";
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      resultsDiv.innerHTML = "No results found.";
    }
  } catch {
    resultsDiv.innerHTML = "Error fetching data. Please try again.";
  }
}

// --- Display movie results ---
function displayMovies(movies) {
  resultsDiv.innerHTML = movies.map(movie => `
    <div class="movie">
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h4>${movie.Title}</h4>
      <button onclick="saveFavorite('${movie.Title}')">Save</button>
    </div>
  `).join("");
}

// --- Save favorite movies ---
function saveFavorite(movieTitle) {
  let favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
  if (!favorites.includes(movieTitle)) {
    favorites.push(movieTitle);
    localStorage.setItem("myFavorites", JSON.stringify(favorites));
    displayFavorites();
  }
}

// --- Display favorites ---
function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
  favoritesDiv.innerHTML = favorites.map(fav => `<p>${fav}</p>`).join("");
}

// --- Export favorites ---
function exportFavorites() {
  const favorites = localStorage.getItem("myFavorites");
  const blob = new Blob([favorites], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "favorites.json";
  a.click();
  URL.revokeObjectURL(url);
}

// --- Clear favorites ---
function clearFavorites() {
  localStorage.removeItem("myFavorites");
  displayFavorites();
}

// --- Accessibility: Enter key triggers search ---
searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchMovies();
  }
});

// --- Display favorites on page load ---
displayFavorites();
