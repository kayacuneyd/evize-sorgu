// Gist URL'si
const gistUrl =
  "https://gist.github.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f";

async function loadCountries() {
  try {
    const response = await fetch(
      "https://gist.github.com/kayacuneyd/08f9d3656cbccf9634d2ee2894be5e1f"
    );
    if (!response.ok) {
      throw new Error("Veri yüklenemedi");
    }
    const data = await response.json();
    console.log(data.countries); // Dönen veriyi konsolda kontrol edin
    return data.countries; // Veriyi doğru bir şekilde döndürdüğünüzden emin olun
  } catch (error) {
    console.error("Veri yükleme hatası:", error);
    return null;
  }
}

async function searchCountry() {
  const countries = await loadCountries();

  if (!countries) {
    console.error("Ülkeler yüklenemedi veya veri boş.");
    return; // Erken çıkış yaparak hata mesajı göster
  }

  const countryInput = document
    .getElementById("countryInput")
    .value.trim()
    .toLowerCase();
  const resultDiv = document.getElementById("result");

  const country = countries.find((c) => c.name.toLowerCase() === countryInput);

  if (country) {
    resultDiv.innerHTML = `${country.name} için e-vize durumu: ${
      country.eVisa ? "E-vize alabilir" : "E-vize alamaz"
    }.`;
  } else {
    resultDiv.innerHTML = "Ülke bulunamadı veya e-vize durumu bilinmiyor.";
  }
}
