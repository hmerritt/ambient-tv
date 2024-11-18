import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import rootReducer from "./reducers";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        // Start with the default middleware (includes thunk)
        let middleware = getDefaultMiddleware();

        // Add redux-logger in development
        if (process.env.NODE_ENV === "development") {
            middleware = middleware.concat(
                createLogger({
                    predicate: (getState, action) =>
                        action.type !== "IMAGE_LOADING_START" &&
                        action.type !== "IMAGE_LOADING_END",
                    collapsed: true
                })
            );
        }

        return middleware;
    }
});

export default store;
