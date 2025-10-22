import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isOpen: boolean;
};

const initialState: initialStateType = {
  isOpen: false,
};
const SearchBarSlice = createSlice({
  name: "SearchBarState",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.isOpen = true;
    },
    closeSearch: (state) => {
      state.isOpen = false;
    },
    toggleSearch: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { closeSearch, openSearch, toggleSearch } = SearchBarSlice.actions;

export { SearchBarSlice };
