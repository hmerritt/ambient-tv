import env from '../../../env';
import { methodAppServer, methodRss } from '../../utils/imageMethods';

// Export action types
export const IMAGE_LOADING_START = 'IMAGE_LOADING_START';
export const IMAGE_LOADING_END = 'IMAGE_LOADING_END';
export const PUSH_NEW_IMAGE = 'PUSH_NEW_IMAGE';
export const CACHE_FEED_DATA = 'CACHE_FEED_DATA';
export const CONTROLS_TOGGLE = 'CONTROLS_TOGGLE';

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
        case 'appserver':
        case 'appServer':
        case 'app-server':
            background = await methodAppServer(env.APP_SERVER_URL + '/assets');
            break;

        case 'rss':
            background = await methodRss(env.RSS_URL);
            break;

        default:
            background = await methodRss(env.RSS_URL);
    }

    dispatch({ type: PUSH_NEW_IMAGE, payload: background });
};

// Cache feed (rss, etc..) data in store
export const cacheFeedData = (feed) => (dispatch) => {
    dispatch({ type: CACHE_FEED_DATA, payload: feed });
};

export const controlsToggle = (yesOrNo = undefined) => (dispatch) => {
    dispatch({ type: CONTROLS_TOGGLE, payload: yesOrNo });
};
