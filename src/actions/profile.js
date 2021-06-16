import { RETRIEVE_USER, UPDATE_USER } from "./type";


import React from 'react';
import AccService from "../services/AdminService/AccService";

export const retrieveUser = () => async (dispatch) => {
    try {
      const res = await AccService.getAccs();
      dispatch({
        type: RETRIEVE_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const updateUser = (id, user) => async (dispatch) => {
    try {
      const res = await AccService.updateAcc(user, id);
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
