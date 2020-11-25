/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';
import moment from 'moment';
import Chance from 'chance';
import * as rssParser from 'react-native-rss-parser';

import * as storage from './storage';
import store from '../state';
import { cacheFeedData } from '../state/actions/bgImageActions';

// Init chance class
const chance = new Chance();

/**
 * Pick a random item from array
 *
 * @param  {Array}  array:  array of items
 * @return {Any}     item:  random item from array
 */
export const random = async (array) => {
    const item = chance.pickone(array.items);
    return item;
};

/**
 * Load and parse rss feed
 *
 * @param  {String} src:  link to RSS feed
 * @return {Object}  {}:  parsed rss object
 */
export const fetchRssFeed = async (src) => {
    const state = store.getState();

    // Check if feed exists in redux store
    if (state.bgImage.feed.cache[src]) {
        // Use cache data
        return state.bgImage.feed.cache[src];
    } else {
        // Get/setup temp storage cache
        const rssTmpCache = await storage.use(`data--${src}`, {});

        // Check if temp cache is valid
        if (rssTmpCache.data && moment().unix() < rssTmpCache.expire) {
            return rssTmpCache.data;
        }

        // Fetch rss feed
        const res = await axios.get(src, {
            responseType: 'text',
        });

        // Parse rss feed
        const rss = await rssParser.parse(res.data);

        // Add to state cache for future requests
        store.dispatch(
            cacheFeedData({
                type: 'rss',
                src: src,
                data: rss,
            }),
        );

        // Add to storage cache
        // Set expire for 1 hour
        rssTmpCache.data = rss;
        rssTmpCache.expire = moment().add(1, 'h').unix();
        storage.set(`data--${src}`, rssTmpCache);

        return rss;
    }
};

/**
 * Get a new image via unsplash
 *
 * @param  {String} src:  link to unsplash-api image
 * @return {Object}  {}:  image object
 */
export const methodUnsplash = async (src) => {
    const res = await axios.get(src, {
        responseType: 'text',
    });

    return {
        src: res.data.urls.raw,
        color: res.data.color,
        description: res.data.description || '',
    };
};

/**
 * Get a new image via an rss feed
 *
 * @param  {String} src:  link to RSS feed
 * @return {Object}  {}:  image object
 */
export const methodRss = async (src) => {
    const rss = await fetchRssFeed(src);

    // Filter already seen images
    let seen = await storage.use(src, {});
    let filteredRss = rss.items.filter((item) => !(item.links[0]?.url in seen));
    if (filteredRss.length === 0) {
        filteredRss = rss.items;
        seen = await storage.set(src, {});
    }

    // Select a random item and find the image link
    const item = chance.pickone(filteredRss);
    const link = item.links[0]?.url || '';

    // Add image to seen
    storage.set(src, { ...seen, [link]: true });

    return {
        src: link,
        color: '#ffffff',
        description: '',
    };
};
