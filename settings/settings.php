<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App Settings</title>
</head>
<body>
    <!-- Table to display current settings -->
    <h2>Current Settings</h2>
    <table border="1">
        <tr>
            <td>OpenWeatherMap API Key:</td>
            <td id="currentApiKey">Not set</td>
        </tr>
        <tr>
            <td>Temperature Unit:</td>
            <td id="currentTemperatureUnit">Not set</td>
        </tr>
        <tr>
            <td>Location:</td>
            <td id="currentLocation">Not set</td>
        </tr>
    </table>

    <!-- Form to apply settings -->
    <h2>Weather App Settings</h2>
    <h4>Use the form below to set values for the weather app dispay.</h4>
    <table>
        <tr>
            <td><label for="apiKey">OpenWeatherMap API Key:</label></td>
            <td><input type="text" id="apiKey" placeholder="Enter API Key"></td>
        </tr>
        <tr>
            <td><label for="temperatureUnit">Temperature Unit:</label></td>
            <td>
                <select id="temperatureUnit">
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><label for="location">Location:</label></td>
            <td><input type="text" id="location" placeholder="Enter City, Country" autocomplete="off">
            <td><div id="locationSuggestions"></div></td>
        </tr>
    </table>
    <button id="saveSettings">Save Settings</button>

    <script src="settings.js"></script>
</body>
</html>
