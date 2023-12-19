import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import createBookWithID from "../../utils/createBookWithID";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      // const index = state.findIndex((book) => book.id === action.payload);
      // if (index !== -1) {
      //   state.splice(index, 1);
      // }

      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
      // return state.map((book) =>
      //   book.id === action.payload
      //     ? { ...book, isFavorite: !book.isFavorite }
      //     : book
      // );
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const thunkFunction = async (dispatch, getState) => {
  // console.log(getState());
  // async action
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    // console.log(res);

    // if (res.data && res.data.title && res.data.author) {
    //   dispatch(addBook(createBookWithID(res.data)));
    // }

    // with optional chaining operator
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithID(res.data, "API")));
    }
  } catch (error) {
    console.log("Error fetching random book", error);
  }
  // console.log(getState());
};

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
