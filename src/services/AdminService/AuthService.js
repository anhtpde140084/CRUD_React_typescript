import axios from "axios";
import { BASE_URL_ADMIN } from '../CommonURL';

/**
 * atuhService
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
class AuthService {

  // get login data
  login(data) {
    return axios.post(BASE_URL_ADMIN + 'login', data).then((response) => {
      if (response.data.accessToken) {
       
        localStorage.setItem("user", JSON.stringify(response.data));
        
      }
      return response.data;
    });
  }

  // remove jwt
  logout() {
    localStorage.removeItem("user");
  }

  // get current user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
