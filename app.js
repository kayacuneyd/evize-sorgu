$(document).ready(function() {
    $('#countrySelect').select2({
        width: '100%', // Select2 genişliğini ayarla
        placeholder: 'Ülke seçin',
        ajax: {
            url: 'https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/cc0699c00485eb31969728715f859224c36ad01d/data.json',
            dataType: 'json',
            delay: 250, // Klavye girişlerinden sonra istek yapmadan önce bekleyecek süre (ms)
            processResults: function (data) {
                // Veriyi Select2 formatına dönüştür
                return {
                    results: data.countries.map(function(country) {
                        return { id: country.code, text: country.country };
                    })
                };
            },
            cache: true
        }
    });

    $('#countrySelect').on('select2:select', function(e) {
        const selectedCountryCode = e.params.data.id;
        // Ülke koduna göre detayları bul
        fetch('https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/cc0699c00485eb31969728715f859224c36ad01d/data.json')
            .then(response => response.json())
            .then(data => {
                const country = data.countries.find(c => c.code === selectedCountryCode);
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
});