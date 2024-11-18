import env from "@/env";

import * as actionTypes from "../actions/bgImageActions";

const initialState = {
    loading: true,
    showControls: false,
    skipped: 0,
    feed: {
        method: env.FETCH_METHOD,
        cache: {},
        seen: {}
    },
    render: {
        backgrounds: [],
        current: {
            loading: true
        }
    }
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
                        loading: true
                    }
                }
            };

        case actionTypes.IMAGE_LOADING_END:
            return {
                ...state,
                loading: false,
                render: {
                    ...state.render,
                    current: {
                        ...state.current,
                        loading: false
                    }
                }
            };

        case actionTypes.PUSH_NEW_IMAGE:
            return {
                ...state,
                render: {
                    ...state.render,
                    backgrounds: [...state.render.backgrounds.slice(-3), action.payload],
                    current: {
                        ...state.current,
                        loading: true
                    }
                }
            };

        case actionTypes.RECORD_SKIP_IMAGE:
            return {
                ...state,
                skipped: state.skipped + 1
            };

        case actionTypes.CACHE_FEED_DATA:
            return {
                ...state,
                feed: {
                    ...state.feed,
                    cache: {
                        ...state.feed.cache,
                        [action.payload.src]: action.payload.data
                    }
                }
            };

        case actionTypes.CONTROLS_TOGGLE:
            return {
                ...state,
                showControls: action.payload ?? !state.showControls
            };

        default:
            return state;
    }
};
