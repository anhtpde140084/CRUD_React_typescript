import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/type";

/**
 * Message
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
const initialState = {};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * reducer for message
 */
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}