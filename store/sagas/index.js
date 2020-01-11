import { all } from "redux-saga/effects";
import demo from "./demo";
export default function* rootSaga() {
  yield all([demo()]);
}
