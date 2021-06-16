import { async } from "q";
import BlogService from "../services/AdminService/BlogService";
import {
  CREATE_BLOG,
  RETRIEVE_BLOG,
  UPDATE_BLOG,
  RETRIEVE_BLOG_BY_ID,
  DELETE_BLOG,
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
 * @param {*} blog 
 * Create Blog action
 */
export const createBlog = (blog) => async (dispatch) => {
  try {
    const res = await BlogService.createBlog(blog);
    dispatch({
      type: CREATE_BLOG,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * 
 * Get data blog
 */
export const retrieveBlog = () => async (dispatch) => {
  try {
    const res = await BlogService.getBlogs();
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
 * @param {*} id 
 * getData by id
 */
export const retrieveBlogById = (id) => async (dispatch) => {
  try {
    const res = await BlogService.getBlogById(id);
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
 * @param {*} id 
 * @param {*} blog 
 * Update blog detail
 */
export const updateBLogDetail = (id, blog) => async (dispatch) => {
  try {
    const res = await BlogService.updateBlog(blog, id);
    dispatch({
      type: UPDATE_BLOG,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * 
 * @param {*} id 
 * Delete Blog
 */
export const deleteBlog = (id) => async (dispatch) => {
  try {
    await BlogService.deleteBlog(id);
    dispatch({
      type: DELETE_BLOG,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * 
 * @param {*} title 
 *  get data by title
 */
export const findBlogByTitle = (title) => async (dispatch) => {
  try {
    const res = await BlogService.getBlogByTitle(title);
    dispatch({
      type: RETRIEVE_BLOG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
