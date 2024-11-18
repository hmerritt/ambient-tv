import * as rssParser from "react-native-rss-parser";
import axios from "axios";
import moment from "moment";

import * as storage from "../storage";

/**
 * Load and parse rss feed
 *
 * @param  {String} src:  link to RSS feed
 * @return {Object}  {}:  parsed rss object
 */
export const fetchRss = async (src) => {
    // Get/setup storage cache
    const rssCache = await storage.use(`data--${src}`, {});

    // Check if cache is valid
    if (rssCache.data && moment().unix() < rssCache.expire) {
        return rssCache.data;
    }

    // Fetch rss feed
    const res = await axios.get(src, {
        responseType: "text"
    });

    // Parse rss feed
    const rss = await rssParser.parse(res.data);

    // Add to storage cache
    // Set expire for 2 hour
    rssCache.data = rss;
    rssCache.expire = moment().add(2, "h").unix();
    storage.set(`data--${src}`, rssCache);

    return rss;
};
