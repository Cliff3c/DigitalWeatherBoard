document.addEventListener('DOMContentLoaded', () => {
    const temperatureUnitSelect = document.getElementById('temperatureUnit');
    const locationResult = document.getElementById('location');
    const apiKeyInput = document.getElementById('apiKey');
    const saveSettingsButton = document.getElementById('saveSettings');
    const locationInput = document.getElementById('location');
    const locationSuggestionsContainer = document.getElementById('locationSuggestions');
    let jsonData; // Variable to store parsed JSON data

    // Load existing settings from settings.json
    loadSettings();

    locationInput.addEventListener('input', handleLocationInput);

    function handleLocationInput() {
        const inputText = locationInput.value.trim();
        const apiKey = apiKeyInput.value.trim();  // Get the API key from the input field

        if (inputText !== '' && apiKey !== '') {
            // Fetch location suggestions from OpenWeatherMap API using the retrieved API key
            fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputText}&limit=5&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    displayLocationSuggestions(data);
                })
                .catch(error => {
                    console.error('Error fetching location suggestions:', error);
                });
        } else {
            // Clear suggestions if input is empty or API key is not set
            locationSuggestionsContainer.innerHTML = '';
        }
    }

    function displayLocationSuggestions(suggestions) {
        // Display location suggestions in the container
        locationSuggestionsContainer.innerHTML = '';

        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.textContent = suggestion.name + (suggestion.state ? `, ${suggestion.state}` : '') + `, ${suggestion.country}`;
            suggestionElement.addEventListener('click', () => {
                // Set the selected suggestion as the input value
                locationInput.value = suggestionElement.textContent;
                locationSuggestionsContainer.innerHTML = ''; // Clear suggestions
            });
            locationSuggestionsContainer.appendChild(suggestionElement);
        });
    }

    function promptApiKey() {
        const apiKey = prompt('Please enter your OpenWeatherMap API key:');
    
        if (apiKey && apiKey.trim() !== '') {
            // Valid API key entered, proceed with loading other settings
            temperatureUnitSelect.value = jsonData.temperatureUnit || 'metric';
            apiKeyInput.value = apiKey;
            if (locationResult) {
                // Check if locationResult element is present before updating its content
                locationResult.textContent = `Location: ${jsonData.location || 'Not Set'}`;
            } else {
                console.error('locationResult element not found.');
            }
    
            // Update the settings.json file with the entered API key
            const newSettings = { ...jsonData, apiKey: apiKey.trim() };
            saveSettingsToFile(newSettings);
        } else {
            // User canceled or entered an empty API key, prompt again
            promptApiKey();
        }
    }
    
    function loadSettings() {
        fetch('settings.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
                }
                return response.text(); // Use response.text() to read the raw text
            })
            .then(data => {
                try {
                    // Attempt to parse the JSON data
                    jsonData = JSON.parse(data);
    
                    // Check if API key is available
                    if (jsonData.apiKey && jsonData.apiKey.trim() !== '') {
                        // API key is available, proceed with loading other settings
                        temperatureUnitSelect.value = jsonData.temperatureUnit || 'metric';
                        apiKeyInput.value = jsonData.apiKey;
                        if (locationResult) {
                            // Check if locationResult element is present before updating its content
                            locationResult.textContent = `Location: ${jsonData.location || 'Not Set'}`;
                        } else {
                            console.error('locationResult element not found.');
                        }
    
                        // Update the current settings table
                        loadExistingSettings();
                    } else {
                        // API key is not available or empty, prompt the user to enter it
                        promptApiKey();
                    }
                } catch (error) {
                    // Handle JSON parsing error
                    console.error('Error parsing JSON data:', error);
                    alert('Error loading settings. Please check your settings.json file.');
                }
            })
            .catch(error => {
                console.error('Error loading settings:', error.message);
            });
    }
    
    function saveSettingsToFile(settings) {
        // Save updated settings to JSON file with pretty-printing
        fetch('saveSettings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings, null, 2), // Use JSON.stringify with indentation for pretty-printing
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
                }
                console.log('Settings saved successfully.');
            })
            .catch(error => {
                console.error('Error saving settings:', error.message);
            });
    }       

    saveSettingsButton.addEventListener('click', saveSettings);

    function saveSettings() {
        const settings = {
            temperatureUnit: temperatureUnitSelect.value,
            location: locationInput.value, // Retrieve the value from locationInput
            apiKey: apiKeyInput.value,
        };
    
        // Make an AJAX request to saveSettings.php
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'saveSettings.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
        // Convert settings object to a query string
        const params = Object.entries(settings).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    // Reload settings after saving
                    loadSettings();
                    // Update the table with the current settings
                    document.getElementById('currentApiKey').textContent = settings.apiKey || 'Not set';
                    document.getElementById('currentTemperatureUnit').textContent = settings.temperatureUnit || 'Not set';
                    document.getElementById('currentLocation').textContent = settings.location || 'Not set';
                } else {
                    console.error('Error saving settings:', xhr.status, xhr.statusText);
                }
            }
        };
    
        xhr.send(params);
    }

    // Function to fetch and display existing settings
    function loadExistingSettings() {
        fetch('settings.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
                }
                return response.json();
            })
            .then(settings => {
                document.getElementById('currentApiKey').textContent = settings.apiKey || 'Not set';
                document.getElementById('currentTemperatureUnit').textContent = settings.temperatureUnit || 'Not set';
                document.getElementById('currentLocation').textContent = settings.location || 'Not set';
            })
            .catch(error => {
                console.error('Error fetching existing settings:', error.message);
            });
    }

    // Call the function to load existing settings when the page loads
    document.addEventListener('DOMContentLoaded', loadExistingSettings);
});
