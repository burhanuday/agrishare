import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialStore = {
  error: 0,
  response: {},
  loading: false,
};

const authReducer = (state = initialStore, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
