import React, { Component } from 'react';
import axios from 'axios';
import authHeader from './AuthHeader';
import { BASE_URL_ADMIN } from '../CommonURL';


class BlogService{

getBlogs(){
    return axios.get(BASE_URL_ADMIN +'blogs', {headers: authHeader()});
}

getBlogByTitle(title){
    return axios.get(BASE_URL_ADMIN + 'blogs/search/' + title, {headers: authHeader()})
}

createBlog(blog){
    return axios.post(BASE_URL_ADMIN +'blogs',blog, {headers: authHeader()});
}

getBlogById(blogId){
    return axios.get(BASE_URL_ADMIN + 'blogs/'+ blogId, {headers: authHeader()});
}

updateBlog(blog, blogId){
    return axios.put(BASE_URL_ADMIN + 'blogs/' + blogId, blog, {headers: authHeader()});
}

deleteBlog(blogId){
    return axios.put(BASE_URL_ADMIN + 'blogsDelete/' + blogId, {headers: authHeader()});
}

getTag(){
    return axios.get(BASE_URL_ADMIN+ 'tags', {headers: authHeader()})
}


}

export default new BlogService()
