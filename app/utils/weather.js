/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';

/**
 * Get weather
 *
 * @return {Object} weather object
 */
export const getWeather = ({ location, setWeather }) => {
    axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=d4f2519531ebd1b345f768ac76e3d2ec`,
        )
        .then((res) => {
            setWeather({
                temp: res.data.main.temp,
                humidity: res.data.main.humidity,
                pressure: res.data.main.pressure,
                title: res.data.weather[0].main,
                description: res.data.weather[0].description,
                iconCode: res.data.weather[0].icon,
                icon: mapOpenweathermapIcon(res.data.weather[0].icon),
                iconUrl: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Map openweathermap icon to actual icon filename
 *
 * @param {String} openweathermap icon text
 * @return {String} icon filename
 */
export const mapOpenweathermapIcon = (iconCode) => {
    switch (iconCode) {
        case '01d': // clear sky
        case '01n':
            return 'sunny.png';

        case '02d': // few clouds
        case '02n':
            return 'partly_cloudy.png';

        case '03d': // scattered clouds
        case '03n':
        case '04d': // broken clouds
        case '04n':
            return 'cloudy.png';

        case '09d': // shower rain
        case '09n':
            return 'rain_heavy.png';

        case '10d': // rain
        case '10n':
            return 'rain.png';

        case '11d': // thunderstorm
        case '11n':
            return 'thunderstorms.png';

        case '13d': // snow
        case '13n':
            return 'snow.png';

        case '50d': // mist
        case '50n':
            return 'mist.png';

        default:
            return 'sunny_s_cloudy.png';
    }
};
