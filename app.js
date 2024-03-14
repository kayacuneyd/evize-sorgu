let allCountries = []; // Tüm ülkeleri saklayacak dizi

// JSON dosyasından ülke verilerini yükleyip, Select2'yi başlatan fonksiyon
async function loadAndInitializeSelect2() {
    const response = await fetch('https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/cc0699c00485eb31969728715f859224c36ad01d/data.json');
    const data = await response.json();
    allCountries = data.countries.map(country => ({
        id: country.code, // id olarak ülke kodunu kullanıyoruz
        text: country.country, // text olarak ülke ismini kullanıyoruz
        flag: country.country_flag,
        description: country.status
    }));

    $('#countrySelect').select2({
        width: '100%',
        placeholder: 'Ülke seçin',
        data: allCountries, // Select2'yi tüm ülkelerle başlatıyoruz
    });
}

$(document).ready(function() {
    loadAndInitializeSelect2();

    // Ülke seçimi yapıldığında detayları göster
    $('#countrySelect').on('select2:select', function (e) {
        const selectedCountryCode = e.params.data.id;
        const country = allCountries.find(c => c.id === selectedCountryCode);
        if (country) {
            document.getElementById('result').innerHTML = `
                <div class="card mx-auto">
                    <div class="card-body">
                        <img class="img-fluid" width="512" src="${country.flag_url}" alt="Flag of ${country.country}">
                        <h2>${country.text} | ${country.id}</h2>
                        <a class="btn btn-primary" target="_blank" href="https://evisa.gov.tr/en/apply/" role="button">Go and Apply</a>
                        <p>${country.description}</p>
                    </div>
                </div>
            `;
        }
    });
});