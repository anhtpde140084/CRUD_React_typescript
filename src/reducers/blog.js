import {CREATE_BLOG, RETRIEVE_BLOG, UPDATE_BLOG, DELETE_ALL_BLOGS, DELETE_BLOG} from '../actions/type';

const initialState = [];

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