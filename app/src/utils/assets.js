import chevronRight from "../../assets/icons/chevron-right.png";
import cloudy from "../../assets/icons/cloudy.png";
import mist from "../../assets/icons/mist.png";
import partly_cloudy from "../../assets/icons/partly_cloudy.png";
import rain from "../../assets/icons/rain.png";
import rain_heavy from "../../assets/icons/rain_heavy.png";
import rain_light from "../../assets/icons/rain_light.png";
import rain_s_cloudy from "../../assets/icons/rain_s_cloudy.png";
import snow from "../../assets/icons/snow.png";
import sunny from "../../assets/icons/sunny.png";
import sunny_s_cloudy from "../../assets/icons/sunny_s_cloudy.png";
import thunderstorms from "../../assets/icons/thunderstorms.png";

export default {
    icons: {
        chevronRight: chevronRight,
        cloudy: cloudy,
        mist: mist,
        partly_cloudy: partly_cloudy,
        rain_heavy: rain_heavy,
        rain_light: rain_light,
        rain_s_cloudy: rain_s_cloudy,
        rain: rain,
        snow: snow,
        sunny_s_cloudy: sunny_s_cloudy,
        sunny: sunny,
        thunderstorms: thunderstorms
    }
};

export const isVideo = (src) => {
    return src.endsWith(".mp4");
};
