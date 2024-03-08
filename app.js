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
        resultDiv.innerHTML = `
        
        <div class="card shadow mx-auto">
              <div class="card-body">
                  <div class="lc-block">
                      <img class="img-fluid" src="${country.flag_url}" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="1080" alt="Flag icon of ${country.country}" loading="lazy">
                  </div>
                  <div class="card-body">
                      <div class="lc-block mb-3">
                          <div editable="rich">

                              <h2 class="h5">${country.country}</h2>

                              <p>You can apply for e-visa to travel to Turkey.</p>
                          </div>
                      </div>
                      <div class="lc-block">
                          <a class="btn btn-primary" target="_blank" href="https://evisa.gov.tr/en/apply/" role="button">Go and Apply</a>
                      </div>

                  </div>
              </div>
          </div>
        
        `;
    } else {
        resultDiv.innerHTML = `<h6>You should apply for the visa at one of the VfT branches in Germany if you have a citizenship from the countries below whose citizens are allowed to enter Türkiye with their national ID’S<h6/>
          <br>
          1. Germany
          2. Belgium
          3. France
          4. Georgia
          5. The Netherlands
          6. Spain
          7. Switzerland
          8. Italy
          9. Turkish Republic of Northern Cyprus
          10. Liechtenstein
          11. Luxemburg
          12. Malta
          13. Portugal
          14. Ukraine
          15. Greece
          16- Poland
          17- Bulgaria
          18- Hungary
          19- Moldova
          20- Azerbaijan
          <br>
          <h6>Countries whose citizens are allowed to enter Türkiye with their expired passports<h6/>
          <br>
          1. Germany – Passports expired within the last year / ID’s expired within the last year
          2. Belgium - Passports expired within the last 5 years.
          3. France - Passports expired within the last 5 years.
          4. Spain - Passports expired within the last 5 years.
          5. Switzerland - Passports expired within the last 5 years.
          6. Luxemburg - Passports expired within the last 5 years.
          7. Portugal - Passports expired within the last 5 years.
          8. Bulgaria – Valid ordinary passport
          <br>
        `;
    }
}
