import axios from "axios";
import { basicAuthHeader } from "../../Utilities/basicAuthHeader";
import { ActionTypes } from "../Constants/actionTypes";
import store from "../store";
import {
  fetchBooksLoading,
  fetchBooksSuccess,
  fetchBooksFailure,
} from "./cart";

export const addBooks = (books) => {
  return {
    type: ActionTypes.ADD_BOOKS,
    payload: books,
  };
};

export const selectBook = (book) => {
  return {
    type: ActionTypes.SELECTED_BOOK,
    payload: book,
  };
};

export const fetchBooks = () => {
  const userId = store.getState()?.user?.user?.userID;
  return async (dispatch) => {
    dispatch(fetchBooksLoading());
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Carts/GetCart?userId=${userId}`,
        {
          headers: {
            Authorization: basicAuthHeader,
            "Content-Type": "application/json",
          },
        }
      );
      const books = response.data;
      dispatch(fetchBooksSuccess(books));
    } catch (error) {
      console.log(error);
      dispatch(fetchBooksFailure("Error while fetching books"));
    }
  };
};
