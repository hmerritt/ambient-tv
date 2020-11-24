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
            const srcUnsplash =
                'https://api.unsplash.com/photos/random/?client_id=iTOeW2ABe1RRjQTVmfZzTCpIuyT0WScnZx9XVhcrmHw&orientation=landscape&featured=true&content_filter=high';
            background = await methodUnsplash(srcUnsplash);
            break;

        case 'rss':
            const srcRss =
                'https://merritt.es/wallpapers/rss.php?path=chromecast';
            background = await methodRss(srcRss);
            break;

        default:
            const srcDefaultRss =
                'https://merritt.es/wallpapers/rss.php?path=chromecast';
            background = await methodRss(srcDefaultRss);
    }

    dispatch({ type: PUSH_NEW_IMAGE, payload: background });
};

// Cache feed (rss, etc..) data in store
export const cacheFeedData = (feed) => (dispatch) => {
    dispatch({ type: CACHE_FEED_DATA, payload: feed });
};
