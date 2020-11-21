/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';
import Chance from 'chance';

// Init chance class
const chance = new Chance();

/**
 * Get a new background to render
 *
 * @param {String}   imageMethod:     method of getting new background, e.g. unsplash, rss...
 * @param {Funciton} pushBackground:  function to process new background infomation
 */
export const getNewBackground = ({ imageMethod, pushBackground }) => {
    switch (imageMethod) {
        case 'unsplash':
            methodUnsplash({ pushBackground });
            break;

        case 'rss':
            methodRss({ pushBackground });
            break;

        default:
            pushBackground({
                src: 'https://merritt.es/wallpapers/my/hmerritt--015-04.jpg',
                color: '#6B85D6',
            });
    }
};

/**
 * Get a new image via unsplash
 *
 * @param {Funciton} pushBackground:  function to process new background infomation
 */
export const methodUnsplash = ({ pushBackground }) => {
    axios
        .get(
            'https://api.unsplash.com/photos/random/?client_id=iTOeW2ABe1RRjQTVmfZzTCpIuyT0WScnZx9XVhcrmHw&orientation=landscape&featured=true&content_filter=high',
        )
        .then((res) => {
            if (res.status === 200) {
                pushBackground({
                    src: res.data.urls.raw,
                    color: res.data.color,
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Get a new image via an rss feed
 *
 * @param {Funciton} pushBackground:  function to process new background infomation
 */
export const methodRss = ({ pushBackground }) => {
    axios
        .get('https://merritt.es/wallpapers/rss.php?path=film', {
            responseType: 'text',
        })
        .then((res) => rssParser.parse(res.data))
        .then((rss) => {
            const item = chance.pickone(rss.items);
            const isLink = item.links.length > 0;
            const link = item.links[0].url || '';

            pushBackground({
                src: link,
                color: '#ffffff',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
