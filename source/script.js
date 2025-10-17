const countriesDiv = document.getElementById("countries");
const cardTemplate = document.getElementById("card-template");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const themeToggle = document.getElementById("theme-toggle");

let countriesData = [];

document.addEventListener("DOMContentLoaded", async () => {
//   applySavedTheme();

  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,borders,cca3");
  if (!res.ok) {
    throw new Error("Error fetching countries");
  }

  countriesData = await res.json();
  renderCountries(countriesData);
});

function renderCountries(data) {
  countriesDiv.innerHTML = "";

  data.forEach((country) => {
    const cardClone = cardTemplate.content.cloneNode(true);
    // const link = cardClone.querySelector("a");
    // link.href = `./details.html?name=${encodeURIComponent(country.name.common)}`;

    cardClone.querySelector("a").href = './details.html?name=' + country.name.common;

    cardClone.querySelector("img").src = country.flags.png;
    cardClone.querySelector("img").alt = country.name.common;
    cardClone.querySelector("h2").textContent = country.name.common;
    cardClone.querySelector("#population").textContent = `Population: ${country.population.toLocaleString()}`;
    cardClone.querySelector("#region").textContent = `Region: ${country.region}`;
    cardClone.querySelector("#capital").textContent = `Capital: ${country.capital?.[0] || "N/A"}`;

    countriesDiv.appendChild(cardClone);
  });
}

//  Search functionality
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = countriesData.filter((c) =>
    c.name.common.toLowerCase().includes(value)
  );
  renderCountries(filtered);
});

// Region filter
regionFilter.addEventListener("change", async (e) => {
  const region = e.target.value;

  if(!region) {
    renderCountries(countriesData);
    return;
  }

  const res = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital`);
  const filtered = await res.json();
  renderCountries(filtered);
});

//  Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function applySavedTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
}