const countryContainer = document.getElementById('country-details');
const themeToggle = document.getElementById('theme-toggle');

// console.log('hello');

document.addEventListener("DOMContentLoaded", async () => {
    applySavedTheme();

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const code = urlParams.get("code");

    if(!name && !code) {
        countryContainer.textContent = 'No country selected.';
        return;
    }

    let country;
    try {
        if(code) {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        [country] = await res.json();

    } else {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        [country] = await res.json();
    }
    renderCountry(country);               
    } catch (err) {
        countryContainer.textContent = "Error loading country details.";
        console.error(err);       
    }
});

// render as a bootstrap row w/columns
function renderCountry(country) {
    const native = Object.values(country.name.nativeName || {})[0]?.common || country.name.common;
    const currencies = Object.values(country.currencies || {}).map(c => c.name).join(", ");
    const languages = Object.values(country.languages || {}).join(", ");
    const capital = country.capital?.[0] || "N/A";
    const borders = country.borders || [];

    const borderHTML = borders.length
    ? `<div class="mb-2"><strong>Border Countries:</strong></div>
       <div class="mb-3 d-flex flex-wrap">
         ${borders.map(code => 
           `<a class="border-link" href="details.html?code=${code}">${code}</a>`).join('')}
       </div>`
    : `<div><strong>Border Countries:</strong> None</div>`;
    // console.log(object);
    
    countryContainer.innerHTML = ` 
    <div class="row align-items-center g-4">
      <div class="col-12 col-md-6 d-flex justify-content-center">
        <img src="${country.flags.svg}" alt="${country.name.common} flag" class="img-fluid rounded shadow-lg" style="max-width:480px; width:100%;">
      </div>
        <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
  <h2 class="mb-4">${country.name.common}</h2>
  <ul class="mb-3 ps-0" style="list-style: none;">
    <li><strong>Native Name:</strong> ${native}</li>
    <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
    <li><strong>Region:</strong> ${country.region}</li>
    <li><strong>Subregion:</strong> ${country.subregion || "N/A"}</li>
    <li><strong>Capital:</strong> ${capital}</li>

    
    <li><strong>Currencies:</strong> ${currencies}</li>
    <li><strong>Languages:</strong> ${languages}</li>
  </ul>
  ${borderHTML}
</div>
  `;
}

// paste the toggle from index

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function applySavedTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
}



// console.log(document.URL.split('name=')[1]);

// console.log(document.URL.split('name=')[1].toLowerCase().replaceAll('%20', ' '));

