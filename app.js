// Gist URL'si
const gistUrl =
  "https://gist.github.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f";

async function loadCountries() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/924ed24d3644a298c6ff08432925ad3e2846769a/data.json');
        if (!response.ok) {
            throw new Error('Veri yüklenemedi: ' + response.statusText);
        }
        const countries = await response.json(); // Doğrudan dizi döndürülüyor.
        return countries; // Artık `.countries` kullanmıyoruz.
    } catch (error) {
        console.error('Veri yükleme hatası:', error);
        return null;
    }
}


async function searchCountry() {
    const countries = await loadCountries();

    if (!countries) {
        console.error('Ülkeler yüklenemedi veya veri boş.');
        return;
    }

    const countryInput = document.getElementById('countryInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');

    // "country" alanını kullanarak arama yapın
    const country = countries.find(c => c.country.toLowerCase() === countryInput);

    if (country) {
        resultDiv.innerHTML = `${country.country} için bayrak URL'si: ${country.flag_url}`;
    } else {
        resultDiv.innerHTML = "Ülke bulunamadı veya e-vize durumu bilinmiyor.";
    }
}
