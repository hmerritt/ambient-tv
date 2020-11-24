import * as actionTypes from '../actions/bgImageActions';

const initialState = {
    loading: true,
    feed: {
        method: 'rss',
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
                current: {
                    ...state.current,
                    loading: true,
                },
            };

        case actionTypes.IMAGE_LOADING_END:
            return {
                ...state,
                loading: false,
                current: {
                    ...state.current,
                    loading: false,
                },
            };

        default:
            return state;
    }
};
