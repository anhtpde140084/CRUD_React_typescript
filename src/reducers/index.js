import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import blogs from './blog'
/**
 * index
 *
 * Version 1.0
 *
 * Date: 06-07-2021
 *
 * Copyright
 *
 * Modification Logs:
 * DATE                 AUTHOR          DESCRIPTION
 * -----------------------------------------------------------------------
 * 06-07-2021          Anhtp8           
 */
export default combineReducers({
  auth,
  message,
  blogs
});