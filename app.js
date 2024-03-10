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
    const sorgu = document.getElementById('sorgu');

    // "country" alanını kullanarak arama yapın
    const country = countries.find(c => c.country.toLowerCase() === countryInput);

    if (country) {
        // Mevcut içeriği temizle
        sorgu.innerHTML = '';
        resultDiv.innerHTML = `
        
        <div class="card mx-auto">
              <div class="card-body">
                  <div class="lc-block">
                    <a class="btn btn-info" href="/" role="button">
                        Search Again
                    </a>
                  </div>
                  <div class="lc-block">
                      <img class="img-fluid" src="${country.flag_url}" sizes="(max-width: 270px) 100vw, 270px" width="270" height="270" alt="Flag icon of ${country.country}" loading="lazy">
                  </div>
                  <div class="card-body">
                    <div class="lc-block mb-3">
                          <div editable="rich">

                              <h2 class="h5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                </svg>
                              ${country.country}
                              </h2>

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
        resultDiv.innerHTML = `
            Probably you need to apply for the visa. However, try to read the popover information opening after clicking the blue button to check your status!
            <br>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Click Before Read 
            </button>
        `;
    }

    document.getElementById('countryInput').value = '';

}
