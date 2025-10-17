const countryContainer = document.getElementById('country-details');
const themeToggle = document.getElementById('theme-toggle');

document.addEventListener("DOMContentLoaded", async () => {
    applySavedTheme();

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");

    if(!name) {
        countryDetails.textContent = 'No country selected.';
        return;
    }

    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const [country] = await res.json();
        renderCountry(country);
        } catch (err) {
        countryDetails.textContent = "Error loadinng country details.";
        console.error(err);       
    }
});

function renderCountry(country) {
    const native = Object.values(country.name.nativeName || {})[0]?.common || country.name.common;
    const currencies = Object.values(country.currencies || {}).map(c => c.name).join(", ");
    const languages = Object.values(country.languages || {}).join(", ");
    const capital = country.capital?.[0] || "N/A";

}    

// console.log(document.URL.split('name=')[1]);

// console.log(document.URL.split('name=')[1].toLowerCase().replaceAll('%20', ' '));

