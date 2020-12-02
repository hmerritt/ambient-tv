/**
 * Ambient TV
 * https://github.com/hmerritt/ambient-tv
 */
import env from '../../env';
import axios from 'axios';
import moment from 'moment';
import * as storage from './storage';
import assets from './assets';

/**
 * Get weather
 *
 * @return {Object} weather object
 */
export const getWeather = async ({ location, setWeather }) => {
    // Get or create weather cache
    let weatherCache = await storage.use('weather', {});

    // Fetch live weather if cache is expired
    if (!weatherCache.data || moment().unix() >= weatherCache.expire) {
        // Fetch weather from api
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${env.OPENWEATHERMAP_KEY}`,
        );

        // Add to storage cache
        // Set expire for 3 hours
        weatherCache.data = res.data;
        weatherCache.expire = moment().add(4, 'h').unix();
        storage.set('weather', weatherCache);
    }

    // Set weather data
    const weather = weatherCache.data;

    // Push data to render
    setWeather({
        temp: weather.main.temp,
        humidity: weather.main.humidity,
        pressure: weather.main.pressure,
        title: weather.weather[0].main,
        description: weather.weather[0].description,
        iconCode: weather.weather[0].icon,
        icon: mapOpenweathermapIcon(weather.weather[0].icon),
        iconUrl: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
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
