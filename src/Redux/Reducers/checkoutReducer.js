import { ActionTypes } from "../Constants/actionTypes";

export const checkoutReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ADDRESS_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.ADD_TOTAL_PRICE:
      return {
        ...state,
        price: action.payload,
      };
    default:
      return state;
  }
};
