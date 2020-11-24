import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    middleware.push(
        createLogger({
            predicate: (getState, action) =>
                action.type !== 'IMAGE_LOADING_START' &&
                action.type !== 'IMAGE_LOADING_END',
        }),
    );
}

export default createStore(rootReducer, applyMiddleware(...middleware));
