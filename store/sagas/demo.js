import { put, call, takeLatest, select } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

export function* login(payload) {}

export default function* actionWatcher() {
  yield takeLatest("actionTypes", login);
}
