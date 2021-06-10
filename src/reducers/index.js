import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import blogs from './blog'
export default combineReducers({
  auth,
  message,
  blogs
});