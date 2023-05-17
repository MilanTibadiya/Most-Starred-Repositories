import { configureStore } from "@reduxjs/toolkit";

import reposSlice from "./reposSlicer";

const store = configureStore({
    reducer: { 
        repos: reposSlice.reducer,
    },
});

export default store;