import * as Location from "expo-location";

/**
 * Get current location
 *
 * @return {Object} location object
 */
export const getLocation = async ({ setLocation }) => {
    // Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    // Return null if location access is denied
    if (status !== "granted") {
        return setLocation(null);
    }

    // Get current location
    const location = await Location.getLastKnownPositionAsync({});
    setLocation(location);
};
