import axios from "axios";
import { BASE_URL_ADMIN } from '../CommonURL';

class AuthService {
  login(data) {
    return axios.post(BASE_URL_ADMIN + 'login', data).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
