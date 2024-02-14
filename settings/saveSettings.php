<?php
// Read current settings from JSON file
$currentSettings = json_decode(file_get_contents('settings.json'), true);

// Get data from the POST request
$newSettings = array(
    'apiKey' => isset($_POST['apiKey']) ? $_POST['apiKey'] : $currentSettings['apiKey'],
    'temperatureUnit' => isset($_POST['temperatureUnit']) ? $_POST['temperatureUnit'] : $currentSettings['temperatureUnit'],
    'location' => isset($_POST['location']) ? cleanLocation($_POST['location']) : $currentSettings['location'],
);

// Validate settings
$errors = array();

if (empty($newSettings['apiKey'])) {
    $errors[] = 'API Key is required.';
}

if (empty($newSettings['temperatureUnit'])) {
    $errors[] = 'Temperature Unit is required.';
}

// If location is not set, require API key first
if (empty($newSettings['location']) && empty($newSettings['apiKey'])) {
    $errors[] = 'Location cannot be set without an API Key.';
}

// Check if there are any errors
if (!empty($errors)) {
    // Output errors and exit
    foreach ($errors as $error) {
        echo $error . "\n";
    }
    exit;
}

// Save updated settings to JSON file with pretty-printing
file_put_contents('settings.json', json_encode($newSettings, JSON_PRETTY_PRINT));

echo 'Settings saved successfully.';

// Function to clean the location by stripping out specific prefixes
function cleanLocation($location) {
    // Add more prefixes to be stripped as needed
    $prefixesToStrip = array('Village of ', 'Town of ');

    // Strip out prefixes
    foreach ($prefixesToStrip as $prefix) {
        $location = preg_replace('/^' . preg_quote($prefix, '/') . '/', '', $location);
    }

    return $location;
}
?>
