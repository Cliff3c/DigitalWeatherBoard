# Digital Weather Board

Digital Weather Board is a digital signage solution designed for 1080p or 4K displays. It provides a visually appealing way to display the current weather conditions and a 5-day forecast.

## Features

- Displays current weather conditions, including temperature and weather description.
- Shows a 5-day weather forecast.
- Uses images to represent different weather conditions (e.g., clear, cloudy, rainy, snowy).
- Provides image attribution and license information for the weather images used.

## Usage

To use Digital Weather Board, follow these steps:

1. Clone the repository to your local machine.
2. Configure your settings by:
	A. Manually editing the `settings/settings.json` file. Make sure to set your OpenWeatherMap API key, location, and temperature unit.
	OR
	B. Visiting the `settings/settings.html` page and updating the weather map settings on that page (PREFERRED METHOD).
3. Open the `weather.html` file in a web browser.
4. The weather information and forecast should now be displayed on your screen.

## Obtaining an OpenWeatherMap API Key

To use the Digital Weather Board and fetch weather data from the OpenWeatherMap API, you need to obtain an API key. Follow these steps to create and obtain your API key:

1. **Sign Up/Login**: If you don't already have an account, sign up for a free account on the [OpenWeatherMap website](https://home.openweathermap.org/users/sign_up). If you have an account, log in.

2. **Generate API Key**: After logging in, go to the [API keys](https://home.openweathermap.org/api_keys) section of your account dashboard.

3. **Generate New Key**: Click on the "Generate" button to create a new API key. You can optionally provide a name for the key to identify its usage.

4. **Copy API Key**: Once the API key is generated, copy it to your clipboard. This key will be used in the `settings.json` file of the Digital Weather Board to fetch weather data.

5. **Configure Settings**: Open the `settings/settings.json` file in your Digital Weather Board project directory and paste the API key into the `apiKey` field.

6. **Save Settings**: Save the `settings.json` file and restart the Digital Weather Board application to apply the new API key.

7. **Verify**: Verify that the weather data is being displayed correctly on your Digital Weather Board. If not, double-check the API key and settings.



## Image Attribution and License Information

- **clear.jpg**: Photo by [Jordan Stewart](https://unsplash.com/@jordan_stewart) on [Unsplash](https://unsplash.com)
- **cloud.jpg**: Photo by [Billy Huynh](https://unsplash.com/@billy_huy) on [Unsplash](https://unsplash.com)
- **default.jpg**: Photo by [Maddison McMurrin](https://unsplash.com/@mhmcmurrin) on [Unsplash](https://unsplash.com)
- **snow.jpg**: Photo by [Aaron Burden](https://unsplash.com/@aaronburden) on [Unsplash](https://unsplash.com)
- **rain.jpg**: Photo by [Eutah Mizushima](https://unsplash.com/@eutahm) on [Unsplash](https://unsplash.com)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
