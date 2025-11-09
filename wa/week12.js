let allJobs = [];
const resultsDiv = document.querySelector("#results");
const favoritesDiv = document.querySelector("#favorites");

// Load jobs
async function loadJobs() {
  const res = await fetch("jobs.json");
  allJobs = await res.json();
  displayJobs(allJobs);
}
loadJobs();

// Apply filters
function applyFilters() {
  const creativePref = parseFloat(document.querySelector("#creative").value);
  const equityPref = parseFloat(document.querySelector("#equity").value);
  const workLifePref = parseFloat(document.querySelector("#workLife").value);
  const sizePref = parseFloat(document.querySelector("#companySize").value);

  const filtered = allJobs.map(job => {
    // match calculation: average of how close each property is to user preference
    const score = (
      (1 - Math.abs(creativePref - job.creativity)) +
      (1 - Math.abs(equityPref - job.equityFocus)) +
      (1 - Math.abs(workLifePref - job.workLifeBalance)) +
      (1 - Math.abs(sizePref - job.companySize))
    ) / 4;

    return { ...job, matchScore: (score * 100).toFixed(0) };
  });

  displayJobs(filtered);
}

// Reset filters
function resetFilters() {
  document.querySelectorAll("#filters input[type='range']").forEach(input => input.value = 0.5);
  displayJobs(allJobs);
}

// Display jobs
function displayJobs(jobs) {
  resultsDiv.innerHTML = jobs.map(job => `
    <div class="job">
      <h3>${job.title}</h3>
      <p>${job.company} — ${job.location}</p>
      <p>Creativity: ${job.creativity}</p>
      <p>Equity Focus: ${job.equityFocus}</p>
      <p>Work-Life: ${job.workLifeBalance}</p>
      <p>Company Size: ${job.companySize}</p>
      <p><strong>Match Score: ${job.matchScore || "—"}%</strong></p>
      <button onclick="saveFavorite('${job.title}')">Save</button>
    </div>
  `).join("");
}

// Favorites
function saveFavorite(title) {
  let favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
  if (!favorites.includes(title)) {
    favorites.push(title);
    localStorage.setItem("myFavorites", JSON.stringify(favorites));
    displayFavorites();
  }
}

function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
  favoritesDiv.innerHTML = favorites.map(fav => `<p>${fav}</p>`).join("");
}

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

function clearFavorites() {
  localStorage.removeItem("myFavorites");
  displayFavorites();
}

// Load favorites on start
displayFavorites();
