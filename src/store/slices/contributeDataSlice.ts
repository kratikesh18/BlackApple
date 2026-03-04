import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IContribuateSongData {
  gid: string;
  name: string;
  artists: string[];
  album: {
    name: string;
    image: string;
  };
  lyrics: {
    line: string;
    startTime: number;
    endTime: number;
    _id: string;
  };
}

interface ContributeDataState {
  contributeSongData: IContribuateSongData | null;
}

const initialState: ContributeDataState = {
  contributeSongData: null,
};

const contributeDataSlice = createSlice({
  name: "contributeData",
  initialState,
  reducers: {
    setContributeData: (
      state,
      action: PayloadAction<IContribuateSongData | null>,
    ) => {
      state.contributeSongData = action.payload;
    },
    
    cleanContributeData: (state, action) => {
      state.contributeSongData = null;
    },
  },
});

export const {
  setContributeData, cleanContributeData
} = contributeDataSlice.actions;

export {contributeDataSlice}
