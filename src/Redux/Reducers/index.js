import { combineReducers } from "redux";
import { booksReducer, selectBookReducer } from "./booksReducer";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { checkoutReducer } from "./checkoutReducer";

const rootReducer = combineReducers({
  books: booksReducer,
  book: selectBookReducer,
  user: userReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
