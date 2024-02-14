document.addEventListener('DOMContentLoaded', () => {
    const locationElement = document.getElementById('location');
    const currentConditionsElement = document.getElementById('current-conditions');
    const forecastElement = document.getElementById('forecast');
    const backgroundContainer = document.getElementById('background-container');

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Fetch settings from settings.json
    fetch('settings/settings.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
        }
        return response.json();
    })
    .then(settings => {
        // Check if API key is available
        if (settings.apiKey && settings.apiKey.trim() !== '') {
            // API key is available, proceed with fetching weather data
            const city = settings.location || 'New York, NY, US';
            const temperatureUnit = settings.temperatureUnit || 'imperial'; // Use 'imperial' as default if not specified

            // Set the location directly in the HTML element
            locationElement.textContent = city;

            // Use temperatureUnit to determine the temperature symbol
            const temperatureSymbol = temperatureUnit === 'imperial' ? '°F' : '°C';

            // Fetch weather data
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${settings.apiKey}&units=${temperatureUnit}`;
            return fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Update current conditions (assuming data.list[0] represents the current conditions)
                    const temperatureF = Math.round(data.list[0].main.temp);
                    const description = data.list[0].weather[0].description;

                    // Use temperatureSymbol in the HTML string
                    currentConditionsElement.innerHTML = `<div>${temperatureF}${temperatureSymbol} <img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" alt="${data.list[0].weather[0].description}"></div>`;

                    // Set background image based on weather conditions
                    setBackgroundImage(description);

                    // Update 5-day forecast
                    forecastElement.innerHTML = ''; // Clear previous forecast

                    for (let i = 0; i < data.list.length; i += 8) {
                        const dayElement = document.createElement('div');
                        dayElement.className = 'day';

                        const dayName = daysOfWeek[new Date(data.list[i].dt * 1000).getDay()];
                        const abbreviatedDate = formatDate(data.list[i].dt);

                        dayElement.innerHTML = `
                            <div>${dayName}</div>
                            <div>${Math.round(data.list[i].main.temp)}${temperatureSymbol}</div>
                            <div><img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" alt="${data.list[i].weather[0].description}"></div>
                            <div>${abbreviatedDate}</div>
                        `;
                        forecastElement.appendChild(dayElement);
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error.message);
                });
        } else {
            throw new Error('OpenWeatherMap API Key is not available. Please set the API Key in settings.');
        }
    })
    .catch(error => {
        console.error('Error fetching settings:', error.message);
    });

    // Function to update current day and full date
    function updateCurrentDayAndDate() {
        const currentDayElement = document.getElementById('current-day');
        const fullDateElement = document.getElementById('full-date');
        const currentDate = new Date();
        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        currentDayElement.textContent = dayOfWeek;
        fullDateElement.textContent = formattedDate;
    }

    // Function to set background image based on weather conditions
    function setBackgroundImage(weatherDescription) {
        const imageUrl = getBackgroundImageSrc(weatherDescription);
        backgroundContainer.style.backgroundImage = `url(${imageUrl})`;
    }

    // Function to get background image URL based on weather conditions
    function getBackgroundImageSrc(weatherDescription) {
        const lowerCaseDescription = weatherDescription.toLowerCase();

        if (lowerCaseDescription.includes('cloud')) {
            return 'img/cloud.jpg';
        } else if (lowerCaseDescription.includes('rain')) {
            return 'img/rain.jpg';
        } else if (lowerCaseDescription.includes('clear')) {
            return 'img/clear.jpg';
        } else if (lowerCaseDescription.includes('snow')) {
            return 'img/snow.jpg';
        } else {
            return 'img/default.jpg';
        }
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Call the function to update the current day and full date when the page loads
    updateCurrentDayAndDate();
});
