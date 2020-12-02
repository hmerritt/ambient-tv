/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */
import * as Location from 'expo-location';

/**
 * Get current location
 *
 * @return {Object} location object
 */
export const getLocation = async ({ setLocation }) => {
    // Request location permission
    const { status } = await Location.requestPermissionsAsync();

    // Return null if location access is denied
    if (status !== 'granted') {
        return setLocation(null);
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
};
