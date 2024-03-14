$(document).ready(function() {
    let allCountries = []; // Tüm ülkeleri saklayacak dizi

    // JSON dosyasından ülke verilerini yükleyip, Select2'yi başlatan fonksiyon
    async function loadAndInitializeSelect2() {
        try {
            const response = await fetch('https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/9caa23ac1a38497a7fb22e6f25296205d9c5a2fd/data.json');
            const data = await response.json();
            allCountries = data.countries.map(country => ({
                id: country.code, // id olarak ülke kodunu kullanıyoruz
                text: country.country, // text olarak ülke ismini kullanıyoruz
                flag: country.flag_url,
                description: country.status,
                url: country.link
            }));

            // Select2'yi başlat
            $('#countrySelect').select2({
                width: '100%',
                placeholder: 'Type or choose your country',
                data: allCountries, // Select2'yi tüm ülkelerle başlatıyoruz
                escapeMarkup: markup => markup, // HTML mesajlar için
                language: {
                    noResults: () => 'No results. <a href="https://visaft.com/stuttgart/visa-required-documents.php" target="_blank">Get More Information</a>'
                }
            });

        } catch (error) {
            console.error('Error loading countries:', error);
        }
    }

    loadAndInitializeSelect2();

    // Ülke seçimi yapıldığında detayları göster
    $('#countrySelect').on('select2:select', function(e) {
        const selectedCountryCode = e.params.data.id;
        const country = allCountries.find(c => c.id === selectedCountryCode);

        let content;
        if (country) {
            content = `
                <div class="card mx-auto">
                    <div class="card-body">
                        <img class="img-fluid" width="256" src="${country.flag}" alt="Flag of ${country.text}">
                        <h2>${country.text} | ${country.id}</h2>
                        <p class="lead">${country.description}</p>
                        <a class="btn btn-primary btn-sm" target="_blank" href="${country.url}" role="button">Get More Information</a>
                    </div>
                </div>
            `;
        } else {
            content = `
                <div class="card mx-auto">
                    <div class="card-body">
                        <h3>You should go to one of the VfT Offices</h3>
                        <p class="lead">
                            You probably need to have a valid visa for your travel to Turkey. For further information:
                        </p>
                        <a class="btn btn-primary btn-sm" target="_blank" href="https://visaft.com/stuttgart/visa-required-documents.php" role="button">Get More Information</a>
                    </div>
                </div>
            `;
        }
        document.getElementById('result').innerHTML = content;
    });
});
