{
    document.addEventListener('DOMContentLoaded', () => {
        // Proxy
        const proxy = 'https://cors-anywhere.herokuapp.com/';

        // Here is where is going to be store the value of the input
        let inputValue = null;

        // Selecting the DOM elements
        const inputLocation = document.querySelector('.weather__form--input');

        const globalWeather = document.querySelector('.weather');

        const weatherLocation = document.querySelector('.weather__location');

        const weatherData = document.querySelector('.weather__data');
        const weatherState = document.querySelector('.weather__state');
        const weatherTemperature = document.querySelector('.weather__temperature');

        // Creating DOM elements
        const weatherImg = document.createElement('img');

        const weatherStateTitle = document.createElement('p');
        const weatherStateName = document.createElement('p');
        const weatherTemperatureTitle = document.createElement('p');
        const weatherTemperatureMin = document.createElement('p');
        const weatherTemperatureMax = document.createElement('p');

        // Inserting class names and attributes to the elements
        weatherImg.className = 'weather__img';
        weatherImg.setAttribute('src', './img/hail.svg');
        weatherImg.setAttribute('alt', 'Weather');

        weatherStateTitle.className = 'weather__state--title title';
        weatherStateName.className = 'weather__state--name';
        weatherTemperatureTitle.className = 'weather__temperature--title title';
        weatherTemperatureMin.className = 'weather__temperature--min';
        weatherTemperatureMax.className = 'weather__temperature--max';

        // Getting the WOEID from the API to get the data of the country
        const location = async (country) => {
            const location = await fetch(`${proxy}https://www.metaweather.com/api/location/search/?query=${country}`);
            const locationData = await location.json();

            const [{ woeid }] = locationData;

            return woeid;
        }

        // Getting the data of the weather of the country
        const weather = async (location) => {
            const weatherLocation = await fetch(`${proxy}https://www.metaweather.com/api/api/location/${location}/`);
            const weatherLocationData = await weatherLocation.json();

            console.log(weatherLocationData);

            return weatherLocationData;
        }

        // Inserting the DOM elements that we created before
        const insertWeather = (data) => {
            // Inserting the data to the DOM elements
            weatherStateTitle.textContent = 'Weather State';
            weatherStateName.textContent = data.consolidated_weather[0].weather_state_name;

            weatherTemperatureTitle.textContent = 'Temperatures';
            weatherTemperatureMin.textContent = data.consolidated_weather[0].min_temp.toFixed(2);
            weatherTemperatureMin.textContent = data.consolidated_weather[0].max_temp.toFixed(2);

            // Inserting in Weather State
            weatherState.appendChild(weatherStateTitle);
            weatherState.appendChild(weatherStateName);

            // Inserting in Weather Temperature
            weatherTemperature.appendChild(weatherTemperatureTitle);
            weatherTemperature.appendChild(weatherTemperatureMin);
            weatherTemperature.appendChild(weatherTemperatureMin);

            // Inserting the name of the country and it's city
            weatherLocation.innerHTML = `${data.parent.title}, <span class="weather__location--country">${data.title}</span>`;

            // Inserting imagen
            globalWeather.insertBefore(weatherLocation, weatherData);
            globalWeather.insertBefore(weatherImg, weatherData);
        }

        function getName(e) {
            if (e.keyCode === 13) {
                e.preventDefault();

                inputValue = inputLocation.value;

                location(inputValue)
                    .then(response => weather(response))
                    .then(response => {
                        insertWeather(response);
                    });
            }
        }

        inputLocation.addEventListener('keydown', getName);
    });
}