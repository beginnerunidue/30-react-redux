import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createBookWithID from "../../utils/createBookWithID";
import { setError } from "./errorSlice";

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    // console.log(thunkAPI);
    try {
      const res = await axios.get(url);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      // console.log(error);
      thunkAPI.dispatch(setError(error.message));
      // OPTION 1
      // return thunkAPI.rejectWithValue(error);

      // OPTION 2
      throw error;
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      // const index = state.findIndex((book) => book.id === action.payload);
      // if (index !== -1) {
      //   state.splice(index, 1);
      // }

      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
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
  // // OPTION 1 this notification for extraReducers is not longer supported?
  // extraReducers: {
  //   [fetchBook.pending]: (state) => {
  //     state.isLoadingViaAPI = true;
  //   },
  //   [fetchBook.fulfilled]: (state, action) => {
  //     state.isLoadingViaAPI = false;
  //     if (action?.payload?.title && action?.payload?.author) {
  //       state.books.push(createBookWithID(action.payload, "API"));
  //     }
  //   },
  //   [fetchBook.rejected]: (state) => {
  //     state.isLoadingViaAPI = false;
  //   },
  // },

  // OPTION 2
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, "API"));
        state.isLoadingViaAPI = false;
      }
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

// WE DON'T NEED THIS FUNCTION MORE!!!
// export const thunkFunction = async (dispatch, getState) => {
//   // console.log(getState());
//   // async action
//   try {
//     const res = await axios.get("http://localhost:4000/random-book");
//     // console.log(res);

//     // if (res.data && res.data.title && res.data.author) {
//     //   dispatch(addBook(createBookWithID(res.data)));
//     // }

//     // with optional chaining operator
//     if (res?.data?.title && res?.data?.author) {
//       dispatch(addBook(createBookWithID(res.data, "API")));
//     }
//   } catch (error) {
//     console.log("Error fetching random book", error);
//   }
//   // console.log(getState());
// };

export const selectBooks = (state) => state.books.books;

export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default booksSlice.reducer;
