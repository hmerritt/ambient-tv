/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */
import Geolocation from '@react-native-community/geolocation';

/**
 * Get current location
 *
 * @return {Object} location object
 */
export const getLocation = ({ setLocation }) => {
    Geolocation.getCurrentPosition((info) => setLocation(info));
};
