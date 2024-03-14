async function loadCountries() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/cc0699c00485eb31969728715f859224c36ad01d/data.json');
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
                    <img class="img-fluid" width="512" src="${country.flag_url}" alt="Flag of ${country.country}">
                    <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                    </svg>
                    ${country.country}
                    </h2>
                    <p>${country.status}</p>
                    <a class="btn btn-primary" 
                        target="_blank" 
                        href="https://evisa.gov.tr/en/apply/" 
                        role="button">
                            Go and Apply
                    </a>
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