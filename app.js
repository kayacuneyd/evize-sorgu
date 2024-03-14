$(document).ready(function() {
    $('#countrySelect').select2({
        placeholder: 'Ülke seçin',
        ajax: {
            url: 'https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/cc0699c00485eb31969728715f859224c36ad01d/data.json',
            dataType: 'json',
            delay: 250, // Klavye girişlerinden sonra istek yapmadan önce bekleyecek süre (ms)
            processResults: function (data) {
                return {
                    results: data.countries.map(item => ({
                        id: item.code, // Her ülkenin benzersiz id'si, burada ülke kodu kullanıldı
                        text: item.country // Gösterilecek metin
                    }))
                };
            },
            cache: true
        }
    });

    // Document hazır olduğunda Select2'yi başlat
    $(document).ready(function() {
        initializeSelect2();
    });

    $('#countrySelect').on('select2:select', async function (e) {
        const selectedCountryName = e.params.data.id;
        const countries = await loadCountries();
        const country = countries.find(c => c.country === selectedCountryName);
        if (country) {
            document.getElementById('result').innerHTML = `
                <div class="card mx-auto">
                    <div class="card-body">
                        <img class="img-fluid" width="512" src="${country.flag_url}" alt="Flag of ${country.country}">
                        <h2>${country.country}</h2>
                        <p>${country.status}</p>
                        <a class="btn btn-primary" target="_blank" href="https://evisa.gov.tr/en/apply/" role="button">Go and Apply</a>
                    </div>
                </div>
            `;
        }
    });
});

async function loadCountries() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/cc0699c00485eb31969728715f859224c36ad01d/data.json');
        if (!response.ok) {
            throw new Error('Veri yüklenemedi: ' + response.statusText);
        }
        const data = await response.json();
        return data.countries;
    } catch (error) {
        console.error('Veri yükleme hatası:', error);
        return null;
    }
}