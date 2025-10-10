import { TrackType } from "@/types/responseTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentTrackState {
  currentTrack: TrackType | null;
  isAvailable: boolean;
}

const initialState: CurrentTrackState = {
  currentTrack: null,
  isAvailable: false,
};

const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<TrackType | null>) {
      state.currentTrack = action.payload;
      state.isAvailable = action.payload !== null;
    },
  },
});

export const { setCurrentTrack } = currentTrackSlice.actions;
export default currentTrackSlice.reducer;
