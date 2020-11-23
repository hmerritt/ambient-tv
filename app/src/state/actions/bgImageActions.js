// Export action types
export const IMAGE_LOADING_START = 'IMAGE_LOADING_START';
export const IMAGE_LOADING_END = 'IMAGE_LOADING_END';

export const imageLoadingState = (loadingState) => (dispatch) => {
    if (loadingState === 'start') {
        dispatch({ type: IMAGE_LOADING_START, payload: true });
    } else {
        dispatch({ type: IMAGE_LOADING_END, payload: false });
    }
};
