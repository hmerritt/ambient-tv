/**
 * Background Viewer
 * https://github.com/hmerritt/background-viewer
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';
import Chance from 'chance';
import * as rssParser from 'react-native-rss-parser';

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

    // Check if feed exists in cache
    if (state.bgImage.feed.cache[src]) {
        // Use cache data
        return state.bgImage.feed.cache[src];
    } else {
        // Fetch rss feed
        const res = await axios.get(src, {
            responseType: 'text',
        });

        // Parse rss feed
        const rss = await rssParser.parse(res.data);

        // Add to cache for future requests
        store.dispatch(
            cacheFeedData({
                type: 'rss',
                src: src,
                data: rss,
            }),
        );

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
    const item = chance.pickone(rss.items);
    const link = item.links[0]?.url || '';

    return {
        src: link,
        color: '#ffffff',
        description: '',
    };
};
