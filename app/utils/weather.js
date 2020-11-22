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
    console.log(location.coords.latitude);
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
                icon: res.data.weather[0].icon,
                iconUrl: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
