let countrySelect = document.getElementById("country");

fetch("https://restcountries.com/v2/all")
  .then((response) => response.json())
  .then((data) => {
    // Сортировка стран по алфавиту
    const countries = data.sort((a, b) => a.name.localeCompare(b.name));

    // Создание пунктов списка
    countries.forEach((country) => {
      const optionElement = document.createElement("option");
      optionElement.value = country.name;
      optionElement.innerText = country.name;
      countrySelect.appendChild(optionElement);
    });
  })
  .catch((error) => console.log(error));

function showRadioStations() {
  const country = document.getElementById("country").value;
  const genre = document.getElementById("genre").value;

  fetch(`https://de1.api.radio-browser.info/json/stations/bycountry/${country}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Ссылка не найдена. Ошибка ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const radioList = document.getElementById("radioList");
      radioList.innerHTML = ""; // Очищаем список радиостанций

      // Добавляем варианты радиостанций в список
      let foundStations = false; // Флаг для отслеживания наличия радиостанций
      data.forEach((station) => {
        if (station.tags.includes(genre)) {
          const stationElement = document.createElement("a");
          stationElement.textContent = station.name;
          stationElement.href = station.url;
          stationElement.target = "_blank"; // Устанавливаем атрибут target для открытия в новой вкладке
          radioList.appendChild(stationElement);
          foundStations = true; // Устанавливаем флаг в true, если найдены радиостанции
        }
      });

      if (!foundStations) {
        const noStationsElement = document.createElement("p");
        noStationsElement.textContent =
          "Нет доступных радиостанций для выбранной комбинации страны и жанра.";
        radioList.appendChild(noStationsElement);
      }
    })
    .catch((error) => console.error(error));
}
