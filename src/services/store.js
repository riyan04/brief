import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";
articleApi


// We're configuring a store
// Store is a global case
// But we don't need the entire state
// Instead we want to reduce it to the specific state which is of our use
export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})