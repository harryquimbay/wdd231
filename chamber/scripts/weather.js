
const apiKey = "590578160d51ce113964750b76f054c9";

const latitude = 4.7110;
const longitude = -74.0721;

const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const weatherIcon = document.querySelector("#weather-icon");
const forecastContainer = document.querySelector("#forecast");

async function getWeather() {
    if (apiKey === "API_weather_key") {
        currentTemp.textContent = "API key required";
        forecastContainer.textContent =
            "Add your OpenWeatherMap API key.";
        return;
    }

    const currentUrl =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok) {
            const errorData = await currentResponse.json();

            throw new Error(
                `Current weather API error ${currentResponse.status}: ${errorData.message}`
            );
        }

        if (!forecastResponse.ok) {
            const errorData = await forecastResponse.json();

            throw new Error(
                `Forecast API error ${forecastResponse.status}: ${errorData.message}`
            );
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather error:", error);

        currentTemp.textContent = "Weather unavailable";
        weatherDescription.textContent = "Please try again later.";
        forecastContainer.textContent = "Forecast unavailable.";
    }
}

function displayCurrentWeather(data) {
    currentTemp.textContent = `${Math.round(data.main.temp)}°C`;

    const description = data.weather[0].description;

    weatherDescription.textContent =
        description.charAt(0).toUpperCase() + description.slice(1);

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt = description;
    weatherIcon.hidden = false;
}

function displayForecast(data) {
    forecastContainer.replaceChildren();

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Bogota",
        weekday: "long",
        month: "short",
        day: "numeric"
    });

    const dayKeyFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Bogota",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    function getDayKey(date) {
        const parts = dayKeyFormatter.formatToParts(date);

        const year = parts.find(
            part => part.type === "year"
        ).value;

        const month = parts.find(
            part => part.type === "month"
        ).value;

        const day = parts.find(
            part => part.type === "day"
        ).value;

        return `${year}-${month}-${day}`;
    }

    const today = getDayKey(new Date());
    const dailyForecasts = new Map();

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const key = getDayKey(date);

        if (key <= today) {
            return;
        }

        if (!dailyForecasts.has(key)) {
            dailyForecasts.set(key, []);
        }

        dailyForecasts.get(key).push(item.main.temp);
    });

    const nextThreeDays = [...dailyForecasts.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(0, 3);

    nextThreeDays.forEach(([key, temperatures]) => {
        const average =
            temperatures.reduce((sum, temp) => sum + temp, 0) /
            temperatures.length;

        const forecastItem = document.createElement("p");
        forecastItem.classList.add("forecast-day");

        const label = document.createElement("strong");
        label.textContent = dateFormatter.format(
            new Date(`${key}T12:00:00-05:00`)
        );

        const temperature = document.createElement("span");
        temperature.textContent = ` ${Math.round(average)}°C`;

        forecastItem.append(label, temperature);
        forecastContainer.appendChild(forecastItem);
    });

    if (nextThreeDays.length === 0) {
        forecastContainer.textContent =
            "Forecast data is currently unavailable.";
    }
}

getWeather();