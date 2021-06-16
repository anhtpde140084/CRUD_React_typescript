import { async } from "q";
import BlogService from "../services/AdminService/BlogService";
import UserServices from "../services/UserService/UserServices";
import {
  CREATE_BLOG,
  RETRIEVE_BLOG,
} from "./type";

/**
 * blog.js
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

/**
 * 
 * Get data blog
 */
export const getBlogs = () => async (dispatch) => {
  try {
    const res = await UserServices.getAllBlog();
    dispatch({
      type: RETRIEVE_BLOG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * 
 * @returns list blog
 */

export const getBlogById = (id) => async (dispatch) => {
    try {
      const res = await UserServices.getBlogById(id);
      dispatch({
        type: RETRIEVE_BLOG,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

/**
 * 
 * @param {*} any 
 *  get data by title
 */
export const findBlogByTitle = (any) => async (dispatch) => {
  try {
    const res = await UserServices.searchAny(any);
    dispatch({
      type: RETRIEVE_BLOG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
