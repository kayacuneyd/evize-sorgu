$(document).ready(async function() {
    const countries = await loadCountries();
    if (countries) {
        $('#countrySelect').select2({
            width: '100%',
            placeholder: 'Ülke seçin',
            data: countries.map(country => ({
                id: country.code, // Select2 içinde birbirinden ayırt etmek için kullanılır
                text: country.country // Kullanıcıya gösterilecek metin
            }))
        });
    }

    $('#countrySelect').on('select2:select', function (e) {
        const selectedCountryCode = e.params.data.id;
        const country = countries.find(c => c.code === selectedCountryCode);
        if (country) {
            $('#result').html(`
                <div class="card mx-auto">
                    <div class="card-body">
                        <img class="img-fluid" width="512" src="${country.flag_url}" alt="Flag of ${country.country}">
                        <h2>${country.country}</h2>
                        <p>${country.status}</p>
                        <a class="btn btn-primary" target="_blank" href="https://evisa.gov.tr/en/apply/" role="button">Go and Apply</a>
                    </div>
                </div>
            `);
        }
    });
});