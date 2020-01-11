import { TEXT_CHANGED } from "./actionTypes";

export const textChanged = text => {
  return {
    type: TEXT_CHANGED,
    payload: text
  };
};
