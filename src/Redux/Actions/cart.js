import axios from "axios";
import { basicAuthHeader } from "../../Utilities/basicAuthHeader";
import { ActionTypes } from "../Constants/actionTypes";
import store from "../store";

export const addBookInCart = (book) => {
  return {
    type: ActionTypes.ADD_BOOK_IN_CART,
    payload: book,
  };
};

export const removeBookFromCart = (bookID) => {
  return {
    type: ActionTypes.REMOVE_BOOK_FROM_CART,
    payload: bookID,
  };
};

export const deleteBook = (bookID) => {
  return {
    type: ActionTypes.DELETE_BOOK,
    payload: bookID,
  };
};

export const fetchBooksLoading = () => {
  return {
    type: ActionTypes.FETCH_BOOKS_LOADING,
  };
};

export const fetchBooksSuccess = (books) => {
  return {
    type: ActionTypes.FETCH_BOOKS_SUCCESS,
    payload: books,
  };
};

export const fetchBooksFinished = () => {
  return {
    type: ActionTypes.FETCH_BOOKS_FINISHED,
  };
};

export const fetchBooksFailure = (errorMsg) => {
  return {
    type: ActionTypes.FETCH_BOOKS_FAILURE,
    payload: errorMsg,
  };
};

export const addToCartAndUpdateBackend = (book) => {
  const userId = store.getState()?.user?.user?.userID;
  return async (dispatch) => {
    dispatch(fetchBooksLoading());
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Carts/AddToCart`,
        {
          userID: userId,
          bookID: book.bookID,
        },
        {
          headers: {
            Authorization: basicAuthHeader,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchBooksFinished());
      dispatch(addBookInCart(book));
    } catch (error) {
      console.log(error);
      dispatch(
        fetchBooksFailure(
          error.message || "Error while connecting to the server:"
        )
      );
    }
  };
};

export const removeBookFromCartAndUpdateBackend = (bookID) => {
  const userId = store.getState()?.user?.user?.userID;
  return async (dispatch) => {
    dispatch(fetchBooksLoading());
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Carts/DecreaseFromCart`,
        {
          userID: userId,
          bookID: bookID,
        },
        {
          headers: {
            Authorization: basicAuthHeader,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchBooksFinished());
      dispatch(removeBookFromCart(bookID));
    } catch (error) {
      console.log(error);
      dispatch(
        fetchBooksFailure(
          error.message || "Error while connecting to the server:"
        )
      );
    }
  };
};

export const deleteBookFromCartAndUpdateBackend = (bookID) => {
  const userId = store.getState()?.user?.user?.userID;
  return async (dispatch) => {
    dispatch(fetchBooksLoading());
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Carts/RemoveFromCart`,
        {
          userID: userId,
          bookID: bookID,
        },
        {
          headers: {
            Authorization: basicAuthHeader,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchBooksFinished());
      dispatch(deleteBook(bookID));
    } catch (error) {
      console.log(error);
      dispatch(
        fetchBooksFailure(
          error.message || "Error while connecting to the server:"
        )
      );
    }
  };
};
