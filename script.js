const apiKey = '7d5e7deeeabf978d0e5af8134c823cfc';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchForm = document.querySelector(".search-box");
const searchInput = document.querySelector(".search-box input");

const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const errorText = document.querySelector(".error");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404 || !response.ok) {
      throw new Error('Invalid city name');
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " &#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    weather.classList.remove("clear", "rain", "mist", "drizzle", "clouds", "snow", "thunderstorm");

    switch (data.weather[0].main) {
      case "Clear":
        weatherIcon.className = "fa-solid fa-sun";
        weather.classList.add("clear");
        break;
      case "Rain":
        weatherIcon.className = "fa-solid fa-cloud-showers-heavy";
        weather.classList.add("rain");
        break;
      case "Mist":
        weatherIcon.className = "fa-solid fa-smog";
        weather.classList.add("mist");
        break;
      case "Drizzle":
        weatherIcon.className = "fa-solid fa-cloud-rain";
        weather.classList.add("drizzle");
        break;
      case "Clouds":
        weatherIcon.className = "fa-solid fa-cloud";
        weather.classList.add("clouds");
        break;
      case "Snow":
        weatherIcon.className = "fa-solid fa-snowflake";
        weather.classList.add("snow");
        break;
      case "Thunderstorm":
        weatherIcon.className = "fa-solid fa-bolt";
        weather.classList.add("thunderstorm");
        break;
      default:
        weatherIcon.className = "fa-solid fa-cloud";
        weather.classList.add("clouds");
    }

    weather.style.display = "block";
    errorText.style.display = "none";
  } catch (error) {
    console.error(error);
    errorText.style.display = "block";
    weather.style.display = "none";
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(searchForm);
  const city = formData.get('city').trim();

  if (city) {
    checkWeather(city);
    searchInput.value = "";
  } else {
    errorText.style.display = "block";
    weather.style.display = "none";
  }
});
