import { ActionTypes } from "../Constants/actionTypes";

// Initial state of the cart
const initialState = {
  books: [],
  isLoading: false,
  error: null,
};

// Reducer function
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BOOK_IN_CART:
      return {
        ...state,
        books: addToCart(state.books, action.payload),
      };
    case ActionTypes.REMOVE_BOOK_FROM_CART:
      return {
        ...state,
        books: removeFromCart(state.books, action.payload),
      };
    case ActionTypes.DELETE_BOOK:
      return {
        ...state,
        books: deleteFromCart(state.books, action.payload),
      };
    case ActionTypes.FETCH_BOOKS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionTypes.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: action.payload,
      };
    case ActionTypes.FETCH_BOOKS_FINISHED:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case ActionTypes.FETCH_BOOKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Helper function to add a book to the cart

const addToCart = (books, bookToAdd) => {
  const existingBook = books.find((book) => book.bookID === bookToAdd.bookID);

  if (existingBook) {
    return books.map((book) =>
      book.bookID === bookToAdd.bookID
        ? { ...book, quantityInCart: book.quantityInCart + 1 }
        : book
    );
  }

  return [...books, { ...bookToAdd, quantityInCart: 1 }];
};

// Helper function to remove a book from the cart
const removeFromCart = (books, bookToRemove) => {
  const existingBook = books.find((book) => book.bookID === bookToRemove);
  if (existingBook?.quantityInCart === 1) {
    return books.filter((book) => book.bookID !== bookToRemove);
  }

  return books.map((book) =>
    book.bookID === bookToRemove
      ? { ...book, quantityInCart: book.quantityInCart - 1 }
      : book
  );
};

// Helper function to delete a book from the cart
const deleteFromCart = (books, bookToDelete) => {
  return books.filter((book) => book.bookID !== bookToDelete);
};
