import {CREATE_BLOG, RETRIEVE_BLOG, UPDATE_BLOG, DELETE_ALL_BLOGS, DELETE_BLOG} from '../actions/type';

/**
 * Blog.js
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
const initialState = [];

// switch for each action
function blogReducer(blogs = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_BLOG:
        return [...blogs, payload];
  
      case RETRIEVE_BLOG:
        return payload;
  
      case UPDATE_BLOG:
        return blogs.map((blog) => {
          if (blog.id === payload.id) {
            return {
              ...blog,
              ...payload,
            };
          } else {
            return blog;
          }
        });
  
      case DELETE_BLOG:
        return blogs.filter(({ id }) => id !== payload.id);
  
      default:
        return blogs;
    }
  };
  
  export default blogReducer;