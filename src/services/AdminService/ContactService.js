
import axios from "axios";
import authHeader from "./AuthHeader";
import { BASE_URL_ADMIN } from "../CommonURL";

class ContactService {
  getAllContactes() {
    return axios.get(BASE_URL_ADMIN + "contactes", { headers: authHeader() });
  }

  getAllContacted() {
    return axios.get(BASE_URL_ADMIN + "contacted", { headers: authHeader() });
  }

  deleteContact(idContact) {
    return axios.put(BASE_URL_ADMIN + 'deleteContact/' +idContact, { headers: authHeader()});
  }

}


export default new ContactService();
