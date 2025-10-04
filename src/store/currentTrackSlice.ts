import { TrackType } from "@/types/responseTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: {} as TrackType | null,
};

const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<TrackType | null>) {
      state.currentTrack = action.payload;
    },
  },
});

export const { setCurrentTrack } = currentTrackSlice.actions;
export default currentTrackSlice.reducer;
