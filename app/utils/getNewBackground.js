/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';

/**
 * Get a new background to render
 *
 * @param {String}   imageMethod:     method of getting new background, e.g. unsplash, rss...
 * @param {Funciton} pushBackground:  function to process new background infomation
 */
export const getNewBackground = ({ imageMethod, pushBackground }) => {
    switch (imageMethod) {
        case 'unsplash':
            axios
                .get(
                    'https://api.unsplash.com/photos/random/?client_id=iTOeW2ABe1RRjQTVmfZzTCpIuyT0WScnZx9XVhcrmHw&orientation=landscape&featured=true&content_filter=high',
                )
                .then((data) => {
                    if (data.status === 200) {
                        pushBackground({
                            src: data.data.urls.raw,
                            color: data.data.color,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            break;

        default:
            pushBackground({
                src: 'https://merritt.es/wallpapers/my/hmerritt--015-04.jpg',
                color: '#6B85D6',
            });
    }
};
