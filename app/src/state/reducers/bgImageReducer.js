import env from '../../../env';
import * as actionTypes from '../actions/bgImageActions';

const initialState = {
    loading: true,
    feed: {
        method: env.FETCH_METHOD,
        cache: {},
        seen: {},
    },
    render: {
        backgrounds: [],
        current: {
            loading: true,
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IMAGE_LOADING_START:
            return {
                ...state,
                render: {
                    ...state.render,
                    current: {
                        ...state.current,
                        loading: true,
                    },
                },
            };

        case actionTypes.IMAGE_LOADING_END:
            return {
                ...state,
                loading: false,
                render: {
                    ...state.render,
                    current: {
                        ...state.current,
                        loading: false,
                    },
                },
            };

        case actionTypes.PUSH_NEW_IMAGE:
            return {
                ...state,
                render: {
                    ...state.render,
                    backgrounds: [
                        ...state.render.backgrounds.slice(-3),
                        action.payload,
                    ],
                    current: {
                        ...state.current,
                        loading: true,
                    },
                },
            };

        case actionTypes.CACHE_FEED_DATA:
            return {
                ...state,
                feed: {
                    ...state.feed,
                    cache: {
                        ...state.feed.cache,
                        [action.payload.src]: action.payload.data,
                    },
                },
            };

        default:
            return state;
    }
};
