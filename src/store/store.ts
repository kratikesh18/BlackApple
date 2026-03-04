import { configureStore } from "@reduxjs/toolkit";

import { SearchBarSlice } from "./slices/searchBarSlice";
import { currentTrackSlice } from "./slices/currentTrackSlice";
import { contributeDataSlice } from "./slices/contributeDataSlice";

const store = configureStore({
  reducer: {
    currentTrack: currentTrackSlice.reducer,
    searchBar: SearchBarSlice.reducer,
    contributeData : contributeDataSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
