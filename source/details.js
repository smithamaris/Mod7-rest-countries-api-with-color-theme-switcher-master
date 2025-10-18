const countryContainer = document.getElementById('country-details');
const themeToggle = document.getElementById('theme-toggle');

// console.log('hello');


document.addEventListener("DOMContentLoaded", async () => {
    applySavedTheme();

    // const code = urlParams.get("code");
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");

    if(!name && !code) {
        countryContainer.textContent = 'No country selected.';
        return;
    }

    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        
        const [country] = await res.json();
        renderCountry(country);
    } catch (err) {
        countryContainer.textContent = "Error loading country details.";
        console.error(err);       
    }
});

function renderCountry(country) {
    const native = Object.values(country.name.nativeName || {})[0]?.common || country.name.common;
    const currencies = Object.values(country.currencies || {}).map(c => c.name).join(", ");
    const languages = Object.values(country.languages || {}).join(", ");
    const capital = country.capital?.[0] || "N/A";
    const borders = country.borders || [];

    const borderHTML = borders.length
        ? `<div class="borders">
              <strong>Border Countries:</strong>
              ${borders.map(code => `
                  <a class="border-link" href="details.html?code=${code}">${code}</a>
              `).join('')}
           </div>`
        : `<p><strong>Border Countries:</strong> None</p>`;
    
    // console.log(object);
    
    countryContainer.innerHTML = ` 
    <div class="country-card">
        <img src="${country.flags.svg}" alt="${country.name.common} flag" />
        <h2>${country.name.common}</h2>
        <p><strong>Native Name:</strong> ${native}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion || "N/A"}</p>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Currencies:</strong> ${currencies}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        ${borderHTML}
        
    </div>
  `;
};

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

