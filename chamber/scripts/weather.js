const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const apiKey = "YOUR_API_KEY_HERE";
const url = "https://api.open-meteo.com/v1/forecast?latitude=49.75&longitude=6.64&current_weather=true";
async function apiFetch() {
    try {
        const response = await fetch(url);

        if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayResults(data);
        } else {
        throw new Error(await response.text());
        }
    } catch (error) {
        console.error("Weather fetch failed:", error);
    }
}

function displayResults(data) {
    currentTemp.textContent = `${data.main.temp}°F`;

    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.textContent = desc;
}

apiFetch();