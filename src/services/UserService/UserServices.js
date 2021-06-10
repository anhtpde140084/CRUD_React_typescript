import axios from "axios";
import { BASE_URL_USER } from "../CommonURL";

class UserSerivces {
  getLastBlog() {
    return axios.get(BASE_URL_USER + "getLastBlog");
  }

  getAllBlog() {
    return axios.get(BASE_URL_USER + "blogs");
  }

  getBlogById(blogId) {
    return axios.get(BASE_URL_USER + "blogs/" + blogId);
  }

  getBlogDetail(blogId) {
    return axios.get(BASE_URL_USER + "blogDetail/" + blogId);
  }

  getAccs() {
    return axios.get(BASE_URL_USER + "profile");
  }

  searchAny(keyword){
    return axios.get(BASE_URL_USER + 'search/' + keyword);
  }

  getComment(id_blog){
    return axios.get(BASE_URL_USER + 'getComment/'+ id_blog);
  }

  postComment(comment){
    return axios.post(BASE_URL_USER+ 'comment', comment)
  }
}
export default new UserSerivces();
