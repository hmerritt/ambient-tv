import { UNSPLASH_API_KEY, RSS_DEFAULT_URL } from '@env';
import { methodRss, methodUnsplash } from '../../utils/bgImage';

// Export action types
export const IMAGE_LOADING_START = 'IMAGE_LOADING_START';
export const IMAGE_LOADING_END = 'IMAGE_LOADING_END';
export const PUSH_NEW_IMAGE = 'PUSH_NEW_IMAGE';
export const CACHE_FEED_DATA = 'CACHE_FEED_DATA';

// Update image loading state
export const imageLoadingState = (loadingState) => (dispatch) => {
    if (loadingState === 'start') {
        dispatch({ type: IMAGE_LOADING_START, payload: true });
    } else {
        dispatch({ type: IMAGE_LOADING_END, payload: false });
    }
};

// Update image loading state
export const getNewBackground = () => async (dispatch, getState) => {
    const state = getState();
    let background = {};

    switch (state.bgImage.feed.method) {
        case 'unsplash':
            const unsplashBase = 'https://api.unsplash.com/photos/random/';
            const unsplashAPI = `?client_id=${UNSPLASH_API_KEY}`;
            const unsplashParams =
                '&orientation=landscape&featured=true&content_filter=high';
            const srcUnsplash = unsplashBase + unsplashAPI + unsplashParams;
            background = await methodUnsplash(srcUnsplash);
            break;

        case 'rss':
            const srcRss = RSS_DEFAULT_URL;
            background = await methodRss(srcRss);
            break;

        default:
            const srcDefaultRss = RSS_DEFAULT_URL;
            background = await methodRss(srcDefaultRss);
    }

    dispatch({ type: PUSH_NEW_IMAGE, payload: background });
};

// Cache feed (rss, etc..) data in store
export const cacheFeedData = (feed) => (dispatch) => {
    dispatch({ type: CACHE_FEED_DATA, payload: feed });
};
