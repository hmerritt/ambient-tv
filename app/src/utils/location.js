import * as Location from "expo-location";

/**
 * Get current location
 *
 * @return {Object} location object
 */
export const getLocation = async ({ setLocation, requestPermission = true }) => {
    // Dreams cannot open an Activity to request permission, so only inspect existing access.
    const { status } = requestPermission
        ? await Location.requestForegroundPermissionsAsync()
        : await Location.getForegroundPermissionsAsync();

    // Return null if location access is denied
    if (status !== "granted") {
        return setLocation(null);
    }

    // Get current location
    const location = await Location.getLastKnownPositionAsync({});
    setLocation(location);
};
