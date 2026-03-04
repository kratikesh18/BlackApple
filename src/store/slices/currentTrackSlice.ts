import { TrackType } from "@/components/app-components/profile-page-components/SpotifyCurrentState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentTrackState {
  currentTrack: TrackType | null;
}

const initialState: CurrentTrackState = {
  currentTrack: null,
};

const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<TrackType | null>) {
      state.currentTrack = action.payload;
    },

    changeAvailability: (state) => {
      if (state.currentTrack) {
        state.currentTrack.isLyricsAvailable = true;
      }
    },
  },
});

export const { setCurrentTrack, changeAvailability } =
  currentTrackSlice.actions;
export { currentTrackSlice };
