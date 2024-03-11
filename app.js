async function loadCountries() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/70eb349134e4b7e4576b361c6e88c08a1798593f/data.json');
        if (!response.ok) {
            throw new Error('Veri yüklenemedi: ' + response.statusText);
        }
        const data = await response.json();
        return data.countries; // Burada `.countries` ile diziye erişiyoruz
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
    const sorgu = document.getElementById('sorgu');
    const country = countries.find(c => c.country.toLowerCase() === countryInput);

    if (country) {
        sorgu.innerHTML = '';
        resultDiv.innerHTML = `
            <div class="card mx-auto">
                <div class="card-body">
                    <a class="btn btn-info" href="/" role="button">Search Again</a>
                    <img class="img-fluid" src="${country.flag_url}" alt="Flag of ${country.country}">
                    <h2>${country.country}</h2>
                    <a class="btn btn-primary" target="_blank" href="https://evisa.gov.tr/en/apply/" role="button">Go and Apply</a>
                </div>
            </div>
        `;
    } else {
        sorgu.innerHTML = '';
        resultDiv.innerHTML = `
            <div>Probably you need to apply for the visa. 
            If you reside in Germany and want to go Türkiye, 
            visit one of our offices to complete your visa application. 
            For more info: 
            <a class="btn btn-primary" href="https://visaft.com/stuttgart/faq.php" target="_blank">Click</a>
            </div>
        `;
    }

    // Input alanını temizle
    document.getElementById('countryInput').value = '';
}