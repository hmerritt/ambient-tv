import Chance from "chance";

import * as storage from "./storage";
import { fetchAppServer } from "./fetch/fetchAppServer";
import { fetchRss } from "./fetch/fetchRss";

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
 * Get a new image via an offical app-server
 *
 * @param  {String} src:  link to app-server
 * @return {Object}  {}:  image object
 */
export const methodAppServer = async (src) => {
    const images = await fetchAppServer(src);

    // Filter already seen images
    let seen = await storage.use(`seen--${src}`, {});
    let filteredImages = images.filter((image) => !(image.link in seen));
    if (filteredImages.length === 0) {
        filteredImages = images;
        seen = await storage.set(`seen--${src}`, {});
    }

    // Select a random image
    const image = chance.pickone(filteredImages);
    image.src = image.link;
    image.method = "app-server";

    // Add image to seen
    storage.set(`seen--${src}`, { ...seen, [image.link]: true });

    return image;
};

/**
 * Get a new image via an rss feed
 *
 * @param  {String} src:  link to RSS feed
 * @return {Object}  {}:  image object
 */
export const methodRss = async (src) => {
    const rss = await fetchRss(src);

    // Filter already seen images
    let seen = await storage.use(`seen--${src}`, {});
    let filteredRss = rss.items.filter((item) => !(item.links[0]?.url in seen));
    if (filteredRss.length === 0) {
        filteredRss = rss.items;
        seen = await storage.set(`seen--${src}`, {});
    }

    // Select a random item and find the image link
    const item = chance.pickone(filteredRss);
    const link = item.links[0]?.url || "";
    const author = item?.authors[0]?.name || "";
    const description = item?.description || "";

    // Add image to seen
    storage.set(`seen--${src}`, { ...seen, [link]: true });

    return {
        src: link,
        method: "rss",
        category: "",
        description: description,
        attribution: author
    };
};
