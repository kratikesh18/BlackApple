import { configureStore } from "@reduxjs/toolkit";

import { SearchBarSlice } from "./searchBarSlice";
import { currentTrackSlice } from "./currentTrackSlice";

const store = configureStore({
  reducer: {
    currentTrack: currentTrackSlice.reducer,
    searchBar: SearchBarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
