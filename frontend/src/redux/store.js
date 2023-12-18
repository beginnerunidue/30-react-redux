import { configureStore } from "@reduxjs/toolkit";
// import booksReducer from "./books/reducer"; // ersetzt durch booksSlice
import booksReducer from "./slices/booksSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
  },
});

export default store;
