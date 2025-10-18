const countriesDiv = document.getElementById("countries");
const cardTemplate = document.getElementById("card-template");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const themeToggle = document.getElementById("theme-toggle");

let countriesData = [];

function applySavedTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  applySavedTheme();
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital");
  if (!res.ok) {
    countriesDiv.innerHTML = `<div class="col-12"><p class="text-danger">Error loading countries!</p></div>`;
    return;
  }
  countriesData = await res.json();
  renderCountries(countriesData);
});

/** Render cards in a Bootstrap 4-by-2 grid */
function renderCountries(data) {
  countriesDiv.innerHTML = "";
  const displayData = data.slice(0, 8); // <---- Only show 8 countries for 4x2

  displayData.forEach(country => {
    const cardClone = cardTemplate.content.cloneNode(true);

    // Fill in card content
    cardClone.querySelector("a").href = `details.html?name=${encodeURIComponent(country.name.common)}`;
    cardClone.querySelector("img").src = country.flags.svg;
    cardClone.querySelector("img").alt = country.name.common;
    cardClone.querySelector("h2").textContent = country.name.common;
    cardClone.querySelector("#population").textContent = `Population: ${country.population.toLocaleString()}`;
    cardClone.querySelector("#region").textContent = `Region: ${country.region}`;
    cardClone.querySelector("#capital").textContent = `Capital: ${country.capital?.[0] || "N/A"}`;
    
    // Bootstrap column wrapper for card
    const col = document.createElement('div');
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex";
    col.appendChild(cardClone);

    countriesDiv.appendChild(col);
  });
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = countriesData.filter((c) =>
    c.name.common.toLowerCase().includes(value)
  );
  renderCountries(filtered);
});

// Region filter
regionFilter.addEventListener("change", (e) => {
  const region = e.target.value;
  if (!region) {
    renderCountries(countriesData);
    return;
  }
  const filtered = countriesData.filter((c) => c.region === region);
  renderCountries(filtered);
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});