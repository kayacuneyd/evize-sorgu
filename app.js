let allCountries = []; // Tüm ülkeleri saklayacak dizi

// JSON dosyasından ülke verilerini yükleyip, Select2'yi başlatan fonksiyon
async function loadAndInitializeSelect2() {
    const response = await fetch('https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/cc0699c00485eb31969728715f859224c36ad01d/data.json');
    const data = await response.json();
    allCountries = data.countries.map(country => ({
        id: country.code, // id olarak ülke kodunu kullanıyoruz
        text: country.country // text olarak ülke ismini kullanıyoruz
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
                        <h2>${country.text}</h2>
                        <!-- Detayları burada gösterebilirsiniz, örneğin: -->
                        <!-- <p>Kod: ${country.id}</p> -->
                        <!-- İhtiyacınıza göre burayı özelleştirebilirsiniz -->
                    </div>
                </div>
            `;
        }
    });
});