import { ActionTypes } from "../Constants/actionTypes";

export const addAddress = (addressDetalis) => {
  return {
    type: ActionTypes.ADD_ADDRESS_DETAILS,
    payload: addressDetalis,
  };
};

export const addTotalPrice = (price) => {
  return {
    type: ActionTypes.ADD_TOTAL_PRICE,
    payload: price,
  };
};
