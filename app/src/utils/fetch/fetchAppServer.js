import axios from 'axios';
import moment from 'moment';

import * as storage from '../storage';

/**
 * Load data from app-server
 *
 * @param  {String} src:  link to app-server
 * @return {Object}  {}:  array of images
 */
export const fetchAppServer = async (src) => {
    // Get/setup storage cache
    const appServerCache = await storage.use(`data--${src}`, {});

    // Check if cache is valid
    if (appServerCache.data && moment().unix() < appServerCache.expire) {
        return appServerCache.data;
    }

    // Fetch image array
    const res = await axios.get(src);

    // Add to storage cache
    // Set expire for 24 hours
    appServerCache.data = res.data;
    appServerCache.expire = moment().add(24, 'h').unix();
    storage.set(`data--${src}`, appServerCache);

    return res.data;
};
