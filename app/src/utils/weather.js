/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */
import axios from 'axios';
import assets from './assets';

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
            return assets.icons.sunny;

        case '02d': // few clouds
        case '02n':
            return assets.icons.sunny_s_cloudy;

        case '04d': // broken clouds
        case '04n':
            return assets.icons.partly_cloudy;

        case '03d': // scattered clouds
        case '03n':
            return assets.icons.cloudy;

        case '09d': // shower rain
        case '09n':
            return assets.icons.rain_heavy;

        case '10d': // rain
        case '10n':
            return assets.icons.rain;

        case '11d': // thunderstorm
        case '11n':
            return assets.icons.thunderstorms;

        case '13d': // snow
        case '13n':
            return assets.icons.snow;

        case '50d': // mist
        case '50n':
            return assets.icons.mist;

        default:
            return assets.icons.sunny_s_cloudy;
    }
};
