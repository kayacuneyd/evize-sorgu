let allCountries = []; // Tüm ülkeleri saklayacak dizi

// JSON dosyasından ülke verilerini yükleyip, Select2'yi başlatan fonksiyon
async function loadAndInitializeSelect2() {
    const response = await fetch('https://gist.githubusercontent.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f/raw/d55ca853c9ba7422a72dda8e93895aaede9d5ee1/data.json');
    const data = await response.json();
    allCountries = data.countries.map(country => ({
        id: country.code, // id olarak ülke kodunu kullanıyoruz
        text: country.country, // text olarak ülke ismini kullanıyoruz
        flag: country.flag_url,
        description: country.status,
        url: country.link
    }));

    $('#countrySelect').select2({
        width: '100%',
        placeholder: 'Type or choose your country',
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
                        <img class="img-fluid" width="256" src="${country.flag}" alt="Flag of ${country.country}">
                        <h2>${country.text} | ${country.id}</h2>
                        <a 
                            class="btn btn-primary btn-sm" 
                            target="_blank" 
                            href="${country.url}" 
                            role="button">
                            Get More Information
                        </a>
                        <p class="lead">${country.description}</p>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('result').innerHTML = `
                <div class="card mx-auto">
                    <div class="card-body">
                        <h3>You should go to one of the VfT Offices</h3>
                        <p class="lead">
                        You probably need to have a valid visa for your travel to Turkey. For futher information:
                        </p>
                        <a 
                            class="btn btn-primary btn-sm" 
                            target="_blank" 
                            href="https://visaft.com/stuttgart/visa-required-documents.php" 
                            role="button">
                            Get More Information
                        </a>
                    </div>
                </div>
            `;
        }
    });
});