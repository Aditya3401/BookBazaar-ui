import { ActionTypes } from "../Constants/actionTypes";

const initialState = {
  books: [],
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BOOKS:
      return { ...state, books: action.payload };
    default:
      return state;
  }
};

export const selectBookReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SELECTED_BOOK:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
