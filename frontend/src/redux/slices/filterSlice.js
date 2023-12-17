import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // in version with ridux slice you can mutate
      // state thanks to 'immer' library

      // state = {
      //   title: action.payload,
      // };
      // return state;

      state.title = action.payload; // oder so ...

      // you can also return new state as usually
      // return { ...state, title: action.payload };
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

// console.log(filterSlice.actions);
// console.log(filterSlice.actions.setTitleFilter("test"));

export const { setTitleFilter, resetFilters } = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;

export default filterSlice.reducer;
